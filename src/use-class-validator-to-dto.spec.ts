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
			errors: [{
				message: messages.invalidDtoClassValidator
			}] 
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
			errors: [{
				message: messages.invalidDtoClassValidatorLength
			}] 
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
        }`, 
			errors: [{
				message: messages.invalidDtoClassValidator
			}] 
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
		}
	]
})
