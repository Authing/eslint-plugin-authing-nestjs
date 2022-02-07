import { getDecoratorByName } from '../../utils'
import { MethodDefinition, Pattern, IDecorator, IContext } from 'estree'

export const messages = {
  invalidArgument: 'It is forbidden to use parameters in the @Body'
}

export const forbidBodyParameters = {
  meta: {
    messages
  },
  create(context: IContext) {
    return {
      MethodDefinition: (node: MethodDefinition) => {
        const bodyParam: Pattern | undefined = node.value.params.find(
          (p: Pattern) => getDecoratorByName(p, 'Body')
        )

        if (bodyParam) {
          const bodyDecorator: IDecorator | undefined = getDecoratorByName(
            bodyParam,
            'Body'
          )
          if (bodyDecorator?.expression?.arguments?.length) {
            context.report({
              node: bodyDecorator,
              messageId: 'invalidArgument'
            })
          }
        }
      }
    }
  }
}
