import {
  useClassAsTypeInMethodOfController,
  messages
} from './use-class-as-type-in-method-of-controller'

const { RuleTester } = require('eslint')

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser')
})

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {}
  }
})

ruleTester.run(
  'use-class-as-type-in-method-of-controller',
  useClassAsTypeInMethodOfController,
  {
    invalid: [
      {
        code: `
        interface IType {
          name: string
        }
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() data: IType) {} 
        }`,
        errors: [
          {
            message: messages.invalidTypeAnnotation
          }
        ]
      },
      {
        code: `
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() item) {} 
        }`,
        errors: [
          {
            message: messages.invalidTypeAnnotation
          }
        ]
      },
      {
        code: `
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() any) {} 
        }`,
        errors: [
          {
            message: messages.invalidTypeAnnotation
          }
        ]
      }
    ],
    valid: [
      {
        code: `
      class IType {
        name: string
      }
      @Controller('example') 
      export class ExampleController {
        @Post() 
        createOne(@Body() data: IType) {} 
      }`
      }
    ]
  }
)
