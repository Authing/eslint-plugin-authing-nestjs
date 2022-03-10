import {
  MethodDefinition,
  Pattern,
  IContext,
  ClassDeclaration,
  PropertyDefinition,
  IValidateDtoFn,
  IDecorator,
  BaseNode
} from 'estree'

import { getDecoratorByName } from '../../utils'

interface IConfig {
  node: ClassDeclaration
}

export const bodyParamMap = new Map()
export const preClassMap = new Map()
export const postClassMap = new Map()

export const messages = {
  invalidDtoClassValidator: 'Each dto field must have a class validator',
  invalidDtoClassValidatorLength:
    'There must be at least 2 class validators for a dto item with IsOptional',
  invalidTypeWithValidateNested: 'Type and ValidateNested must appear at the same time'
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
      MethodDefinition(node: MethodDefinition) {
        $MethodDefinition.apply(this, [node, context])
      }
    }
  }
}

function forEachClassDefinitionBody(
  node: ClassDeclaration,
  context: IContext,
  config: IConfig,
  validateDto: IValidateDtoFn,
  isNested: boolean
) {
  node.body.body.forEach((nodeItem: MethodDefinition | PropertyDefinition) => {
    checkDtoClassValidator(nodeItem, context, config)
    checkDtoClassValidatorLength(nodeItem, context, config)
    if (
      isNested &&
      nodeItem?.decorators?.length &&
      nodeItem.decorators.find(decorator => decorator.expression.callee.name === 'ValidateNested')
    ) {
      checkTypeWithValidateNested(node, nodeItem.decorators, context)
      checkNestedDto(nodeItem, context, validateDto)
    }
  })
}

function $MethodDefinition(node: MethodDefinition, context: IContext) {
  const bodyParam: Pattern | undefined = node.value.params.find(p => getDecoratorByName(p, 'Body'))

  if (!bodyParam) {
    return
  }

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

function checkDtoClassValidator(
  nodeItem: MethodDefinition | PropertyDefinition,
  context: IContext,
  config: IConfig
) {
  if (!nodeItem.decorators?.length) {
    context.report({
      node: config.node,
      messageId: 'invalidDtoClassValidator'
    })
  }
}

function checkDtoClassValidatorLength(
  nodeItem: MethodDefinition | PropertyDefinition,
  context: IContext,
  config: IConfig
) {
  if (
    Array.isArray(nodeItem.decorators) &&
    nodeItem.decorators.find(decorator => decorator.expression.callee.name === 'IsOptional') &&
    nodeItem.decorators.length < 2
  ) {
    context.report({
      node: config.node,
      messageId: 'invalidDtoClassValidatorLength'
    })
  }
}

function checkNestedDto(
  nodeItem: MethodDefinition | PropertyDefinition,
  context: IContext,
  validateDto: IValidateDtoFn
) {
  const _typeNname: string | undefined = nodeItem?.typeAnnotation?.typeAnnotation?.typeName?.name
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

function checkTypeWithValidateNested(node: BaseNode, decorators: IDecorator[], context: IContext) {
  if (!decorators.find(decorator => decorator.expression.callee.name === 'Type')) {
    context.report({
      node,
      messageId: 'invalidTypeWithValidateNested'
    })
  }
}

function validateDto(node: ClassDeclaration, context: IContext): void {
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

  forEachClassDefinitionBody(node, context, config, validateDto, true)
}
