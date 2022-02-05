import {
  Pattern,
  BaseFunction,
  MethodDefinition,
  BlockStatement,
  ClassDeclaration,
  ClassBody,
  PropertyDefinition
} from 'estree'

declare module 'estree' {
  export interface ICallee {
    name: string
    type: 'Identifier'
    [name: string]: any
  }

  type ICallExpression = CallExpression & {
    name: string
    callee: ICallee
  }

  type IDecorator = {
    expression: ICallExpression
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

  type IPattern = Pattern & {
    decorators: IDecorator[]
    name: string
    typeAnnotation?: ITypeAnnotation
  }

  interface IBaseFunction extends BaseFunction {
    params: Array<IPattern>
  }

  interface IFunctionExpression extends IBaseFunction {
    id?: Identifier | null | undefined
    type: 'FunctionExpression'
    body: BlockStatement
  }

  interface IMethodDefinition extends MethodDefinition {
    value: IFunctionExpression
    decorators?: IDecorator[]
  }

  interface IPropertyDefinition extends PropertyDefinition {
    decorators?: IDecorator[]
  }

  interface IClassBody extends ClassBody {
    body: Array<IMethodDefinition | IPropertyDefinition>
  }

  interface IClassDeclaration extends ClassDeclaration {
    body: IClassBody
  }
}
