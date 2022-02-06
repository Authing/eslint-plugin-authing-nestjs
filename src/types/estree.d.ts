import { CallExpression } from 'estree'

declare module 'estree' {
  interface ICallee {
    type: string
    [name: string]: any
  }
  interface BaseNode {
    name?: string
    callee?: ICallee
  }

  type IDecorator = {
    expression: CallExpression
  }

  interface ICodeStation {
    line: number
    column: number
  }

  interface IPureTypeAnnotation {
    loc: {
      start: ICodeStation
      end: ICodeStation
    }
    range: [number, number]
    type: string
    typeAnnotation?: {
      typeName?: TypeName
    }
  }

  interface TypeName extends IPureTypeAnnotation {
    name: string
  }

  interface ITypeAnnotation extends IPureTypeAnnotation {
    parent: ITypeAnnotation
  }

  interface IPattern {
    decorators?: IDecorator[]
    name?: string
    typeAnnotation?: ITypeAnnotation
  }

  interface Identifier extends IPattern {}

  interface ObjectPattern extends IPattern {}

  interface ArrayPattern extends IPattern {}

  interface RestElement extends IPattern {}

  interface AssignmentPattern extends IPattern {}

  interface MemberExpression extends IPattern {}
  interface BaseFunction {
    params: Array<Pattern>
  }

  interface MethodDefinition {
    decorators?: IDecorator[]
  }

  interface PropertyDefinition {
    decorators?: IDecorator[]
  }
}
