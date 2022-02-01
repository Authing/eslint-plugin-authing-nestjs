import { forbidReadBodyFromReq, messages } from './forbid-read-body-from-req'

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

ruleTester.run('forbid-body-parameters', forbidReadBodyFromReq, {
	invalid: [
		{
			code: `
        @Controller('example') 
        export class ExampleController { 
          @Post() 
          createOne(@Req() request: Request) {
            const body = request.body
          } 
        }`, 
			errors: [{
				message: messages.invalidBodyFromReq
			}] 
		}
	],
	valid: [
		{ code: `
      @Controller('example') 
      export class ExampleController {
        @Post() 
        createOne(@Req() req: Request) {
          const header = req.header
        } 
      }` 
		}
	]
})
