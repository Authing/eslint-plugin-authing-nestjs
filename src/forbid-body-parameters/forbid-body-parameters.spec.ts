import { forbidBodyParameters, messages } from './forbid-body-parameters'

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

ruleTester.run('forbid-body-parameters', forbidBodyParameters, {
	invalid: [
		{
			code: `
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Body('a') item: string) {} 
        }`, 
			errors: [{
				message: messages.invalidArgument
			}] 
		}
	],
	valid: [
		{ code: `
      @Controller('example') 
      export class ExampleController {
        @Post() 
        createOne(@Body() item: MyTypeDto) {} 
      }` 
		}
	]
})
