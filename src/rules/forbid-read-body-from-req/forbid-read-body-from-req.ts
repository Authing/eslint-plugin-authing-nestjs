import { getDecoratorByName } from '../../utils'
import { MethodDefinition, Pattern } from 'estree'

let reqName: string | undefined = 'req'

export const messages = {
  invalidBodyFromReq: 'It is forbidden to read body from Req'
}

export const forbidReadBodyFromReq = {
  meta: {
    messages
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (node.object.name === reqName && node.property.name === 'body') {
          reqName = ''
          context.report({
            node,
            messageId: 'invalidBodyFromReq'
          })
        }
      },
      MethodDefinition: (node: MethodDefinition) => {
        const reqParam: Pattern | undefined = node.value.params.find(p =>
          getDecoratorByName(p, 'Req')
        )

        if (reqParam) {
          reqName = reqParam.name
        }
      }
    }
  }
}
