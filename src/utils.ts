import { CallExpression, Expression } from 'estree'

export type Decorator = {
  expression: Expression
}

export function getDecoratorByName(
  node: any /** node: Pattern */,
  name: string
): Decorator | undefined {
  const result: Decorator | undefined = (node.decorators || []).find(d => {
    const expression =
      d.expression &&
      d.expression.type === 'CallExpression' &&
      (d.expression as CallExpression)
    return (
      expression &&
      expression.callee.type === 'Identifier' &&
      expression.callee.name === name
    )
  })
  return result
}
