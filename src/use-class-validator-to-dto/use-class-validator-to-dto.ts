import { getDecoratorByName } from '../utils'
import {
  IMethodDefinition,
  IClassDeclaration,
  IPropertyDefinition,
  IPattern
} from 'estree'

const bodyParamMap = new Map()

export const messages = {
  invalidDtoClassValidator: 'Each dto field must have a class validator',
  invalidDtoClassValidatorLength:
    'There must be at least 2 class validators for a dto item with IsOptional'
}

export const useClassValidatorToDto = {
  meta: {
    messages
  },
  create(context) {
    return {
      ClassDeclaration(node: IClassDeclaration) {
        const config = bodyParamMap.get(node.id?.name)
        if (!config) {
          return
        }
        node.body.body.forEach(
          (nodeItem: IMethodDefinition | IPropertyDefinition) => {
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
            }
          }
        )
      },
      MethodDefinition: (node: IMethodDefinition) => {
        const bodyParam: IPattern | undefined = node.value.params.find(p =>
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
