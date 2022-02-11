import {
  MethodDefinition,
  Pattern,
  IContext,
  ClassDeclaration,
  PropertyDefinition,
  IValidateDtoFn
} from 'estree'
import { getDecoratorByName } from '../../utils'

export const bodyParamMap = new Map()
export const preClassMap = new Map()
export const postClassMap = new Map()

export const messages = {
  invalidDtoClassValidator: 'Each dto field must have a class validator',
  invalidDtoClassValidatorLength:
    'There must be at least 2 class validators for a dto item with IsOptional'
}

export function $MethodDefinition(node: MethodDefinition, context: IContext) {
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

interface IConfig {
  node: ClassDeclaration
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
  if (
    nodeItem?.decorators?.length &&
    nodeItem.decorators.find(decorator => decorator.expression.callee.name === 'ValidateNested')
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
}

export function forEachClassDefinitionBody(
  node: ClassDeclaration,
  context: IContext,
  config: IConfig,
  validateDto: IValidateDtoFn,
  isNested: boolean
) {
  node.body.body.forEach((nodeItem: MethodDefinition | PropertyDefinition) => {
    checkDtoClassValidator(nodeItem, context, config)
    checkDtoClassValidatorLength(nodeItem, context, config)
    if (isNested) {
      checkNestedDto(nodeItem, context, validateDto)
    }
  })
}
