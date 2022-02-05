import { IPattern, Decorator } from 'estree'

export function getDecoratorByName(
  node: IPattern,
  name: string
): Decorator | undefined {
  const result: Decorator | undefined = (node.decorators || []).find(d => {
    const expression =
      d.expression &&
      d.expression.type === 'CallExpression' &&
      d.expression
    return (
      expression &&
      expression.callee.type === 'Identifier' &&
      expression.callee.name === name
    )
  })
  return result
}
