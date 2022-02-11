import { getDecoratorByName } from '../../utils'
import {
  MethodDefinition,
  PropertyDefinition,
  ClassDeclaration,
  Pattern,
  IContext
} from 'estree'

const bodyParamMap = new Map()
const preClassMap = new Map()
const postClassMap = new Map()

export const messages = {
  invalidDtoClassValidator: 'Each dto field must have a class validator',
  invalidDtoClassValidatorLength:
    'There must be at least 2 class validators for a dto item with IsOptional'
}

function validateDto(node: ClassDeclaration, context: IContext) {
  if (!node.id?.name) {
    return
  }

  let config = bodyParamMap.get(node.id.name) || postClassMap.get(node.id.name)

  if (!config) {
    return
  }

  if (typeof config === 'boolean') {
    config = { node }
  }

  node.body.body.forEach((nodeItem: MethodDefinition | PropertyDefinition) => {
    if (!nodeItem.decorators?.length) {
      context.report({
        node: config.node,
        messageId: 'invalidDtoClassValidator'
      })
    } else if (
      nodeItem.decorators.find(
        decorator => decorator.expression.callee.name === 'IsOptional'
      ) &&
      nodeItem.decorators.length < 2
    ) {
      context.report({
        node: config.node,
        messageId: 'invalidDtoClassValidatorLength'
      })
    } else if (
      nodeItem.decorators.find(
        decorator => decorator.expression.callee.name === 'ValidateNested'
      )
    ) {
      const _typeNname: string | undefined =
        nodeItem?.typeAnnotation?.typeAnnotation?.typeName?.name
      if (_typeNname) {
        if (preClassMap.has(_typeNname)) {
          bodyParamMap.set(_typeNname, preClassMap.get(_typeNname))
          validateDto(preClassMap.get(_typeNname).node, context)
          preClassMap.delete(_typeNname)
        } else {
          postClassMap.set(_typeNname, true)
        }
      }
    }
  })
}

export const useClassValidatorToDto = {
  meta: {
    messages
  },
  create(context: IContext) {
    return {
      ClassDeclaration(node: ClassDeclaration) {
        if (!node.id?.name) {
          return
        }

        if (!preClassMap.has(node.id.name) && !bodyParamMap.has(node.id.name)) {
          preClassMap.set(node.id.name, {
            node
          })
        }

        validateDto(node, context)
      },
      MethodDefinition: (node: MethodDefinition) => {
        const bodyParam: Pattern | undefined = node.value.params.find(p =>
          getDecoratorByName(p, 'Body')
        )

        if (bodyParam) {
          const { typeAnnotation } = bodyParam
          if (typeAnnotation?.typeAnnotation?.typeName?.name) {
            bodyParamMap.set(typeAnnotation.typeAnnotation.typeName.name, {
              node
            })
          } else {
            context.report({
              node,
              messageId: 'invalidDtoClassValidator'
            })
          }
        }
      }
    }
  }
}
