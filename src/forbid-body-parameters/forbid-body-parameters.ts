import { getDecoratorByName } from '../utils'
import { IMethodDefinition, IPattern, Decorator } from 'estree'

export const messages = {
  invalidArgument: 'It is forbidden to use parameters in the @Body'
}

export const forbidBodyParameters = {
  meta: {
    messages
  },
  create(context) {
    return {
      MethodDefinition: (node: IMethodDefinition) => {
        const bodyParam: IPattern | undefined = node.value.params.find(
          (p: IPattern) => getDecoratorByName(p, 'Body')
        )

        if (bodyParam) {
          const bodyDecorator: Decorator | undefined = getDecoratorByName(
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
