import { getDecoratorByName } from '../../utils'
import { IContext, MemberExpression, MethodDefinition, Pattern } from 'estree'

let reqName: string | undefined = 'req'

export const messages = {
  invalidBodyFromReq: 'It is forbidden to read body from Req, eg: req.body'
}

export const forbidReadBodyFromReq = {
  meta: {
    messages
  },
  create(context: IContext) {
    return {
      MemberExpression(node: MemberExpression) {
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
