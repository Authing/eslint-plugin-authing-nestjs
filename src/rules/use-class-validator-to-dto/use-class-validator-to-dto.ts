import { MethodDefinition, ClassDeclaration, IContext, IValidateDtoFn } from 'estree'
import {
  $MethodDefinition,
  messages,
  bodyParamMap,
  preClassMap,
  postClassMap,
  forEachClassDefinitionBody
} from './refs'

const validateDto: IValidateDtoFn = (node: ClassDeclaration, context: IContext): void => {
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
