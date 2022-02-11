import { MethodDefinition, ClassDeclaration, IContext, IValidateDtoFn } from 'estree'
import { $MethodDefinition, messages, bodyParamMap, forEachClassDefinitionBody } from './refs'

const validateDto: IValidateDtoFn = (node: ClassDeclaration, context: IContext): void => {
  if (!node.id?.name) {
    return
  }

  const config = bodyParamMap.get(node.id.name)

  if (!config) {
    return
  }

  forEachClassDefinitionBody(node, context, config, validateDto, false)
}

export const useClassValidatorToDto = {
  meta: {
    messages
  },
  create(context: IContext) {
    return {
      ClassDeclaration(node: ClassDeclaration) {
        if (node.id?.name) {
          validateDto(node, context)
        }
      },
      MethodDefinition(node: MethodDefinition) {
        $MethodDefinition.apply(this, [node, context])
      }
    }
  }
}
