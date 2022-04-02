import { getDecoratorByName } from '../../utils'
import { IContext, ITSInterfaceDeclaration, MethodDefinition, Pattern } from 'estree'

const bodyParamMap = new Map()

export const messages = {
  invalidTypeAnnotation:
    'The @Body type annotation in the function must be a class, eg: @Body() dto: ClassDto'
}

export const useClassAsTypeInMethodOfController = {
  meta: {
    messages
  },
  create(context: IContext) {
    return {
      TSInterfaceDeclaration(node: ITSInterfaceDeclaration) {
        const config = bodyParamMap.get(node.id.name)
        if (config) {
          context.report({
            node: config.node,
            messageId: 'invalidTypeAnnotation'
          })
        }
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
              messageId: 'invalidTypeAnnotation'
            })
          }
        }
      }
    }
  }
}
