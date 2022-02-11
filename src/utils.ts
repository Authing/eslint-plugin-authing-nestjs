import { Pattern, IDecorator } from 'estree'

export function getDecoratorByName(node: Pattern, name: string): IDecorator | undefined {
  const result: IDecorator | undefined = (node.decorators || []).find(d => {
    const expression = d.expression && d.expression.type === 'CallExpression' && d.expression
    return expression && expression.callee.type === 'Identifier' && expression.callee.name === name
  })
  return result
}
