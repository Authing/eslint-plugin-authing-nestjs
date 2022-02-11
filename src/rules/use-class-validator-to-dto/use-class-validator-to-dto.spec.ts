import { useClassValidatorToDto, messages } from './use-class-validator-to-dto'

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

ruleTester.run('use-class-validator-to-dto', useClassValidatorToDto, {
  invalid: [
    {
      code: `
        class IType {
          name: string
        }
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() data: IType) {} 
        }`,
      errors: [
        {
          message: messages.invalidDtoClassValidator
        }
      ]
    },
    {
      code: `
        class IType {
          @IsOptional()
          name: string
        }
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() data: IType) {} 
        }`,
      errors: [
        {
          message: messages.invalidDtoClassValidatorLength
        }
      ]
    },
    {
      code: `
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() a: any) {} 
        }`,
      errors: [
        {
          message: messages.invalidDtoClassValidator
        }
      ]
    },
    {
      code: `
        @Controller('example') 
        export class ExampleController { 
          @Post()
          createOne(@Body() createOne: CreateOneDto) {} 
        }

        class Args1 {
          name: string

          @ValidateNested()
          args2: Args2
        }

        class CreateOneDto {
          @ValidateNested()
          args1: Args1
        }

        class Args2 {
          name: string
        }`,
      errors: [
        {
          message: messages.invalidDtoClassValidator
        },
        {
          message: messages.invalidDtoClassValidator
        }
      ]
    },
    {
      code: `
        @Controller('example') 
        export class ExampleController { 
          @Post()
          createOne(@Body() createOne: CreateOneDto) {} 
        }

        class CreateOneDto {
          @ValidateNested()
          args1: Args1
        }

        class Args1 {
          name: string

          @ValidateNested()
          args2: Args2
        }

        class Args2 {
          @IsOptional()
          name: string
        }`,
      errors: [
        {
          message: messages.invalidDtoClassValidator
        },
        {
          message: messages.invalidDtoClassValidatorLength
        }
      ]
    }
  ],
  valid: [
    {
      code: `
        class IType {
          @IsString()
          name: string
        }
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() data: IType) {} 
        }`
    },
    {
      code: `
        class IType {
          @IsString()
          @IsOptional()
          name: string
        }
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body() data: IType) {} 
        }`
    },
    {
      code: `
        @Controller('example') 
        export class ExampleController { 
          @Post()
          createOne(@Body() createOne: CreateOneDto) {} 
        }

        class Args1 {
          @IsString()
          name: string

          @ValidateNested()
          args2: Args2
        }

        class CreateOneDto {
          @ValidateNested()
          args1: Args1
        }

        class Args2 {
          @IsString()
          name: string
        }`
    }
  ]
})
