import { CallExpression } from 'estree'

declare module 'estree' {
  export interface ICallee {
    type: string
    [name: string]: any
  }
  export interface BaseNode {
    name?: string
    callee?: ICallee
  }

  export type IDecorator = {
    expression: CallExpression
  }

  export interface ICodeStation {
    line: number
    column: number
  }

  export interface IPureTypeAnnotation {
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
  
  export interface TypeName extends IPureTypeAnnotation {
    name: string
  }

  export interface ITypeAnnotation extends IPureTypeAnnotation {
    parent: ITypeAnnotation
  }

  export interface IPattern {
    decorators?: IDecorator[]
    name?: string
    typeAnnotation?: ITypeAnnotation
  }

  export interface Identifier extends IPattern {}

  export interface ObjectPattern extends IPattern {}

  export interface ArrayPattern extends IPattern {}

  export interface RestElement extends IPattern {}

  export interface AssignmentPattern extends IPattern {}

  export interface MemberExpression extends IPattern {}
  export interface BaseFunction {
    params: Array<Pattern>
  }
  export interface MethodDefinition {
    decorators?: IDecorator[]
  }

  export interface PropertyDefinition {
    decorators?: IDecorator[]
  }
}
