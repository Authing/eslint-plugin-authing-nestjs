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
        @Controller('example1') 
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
          message: messages.invalidTypeWithValidateNested
        },
        {
          message: messages.invalidDtoClassValidator
        },
        {
          message: messages.invalidTypeWithValidateNested
        },
        {
          message: messages.invalidDtoClassValidator
        }
      ]
    },
    {
      code: `
        @Controller('example2') 
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
          message: messages.invalidTypeWithValidateNested
        },
        {
          message: messages.invalidTypeWithValidateNested
        },
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
        @Controller('example3') 
        export class ExampleController { 
          @Post()
          createOne(@Body() createOne: CreateOneDto) {} 
        }

        class Args1 {
          @IsString()
          name: string

          @ValidateNested()
          @Type(() => Args2)
          args2: Args2
        }

        class CreateOneDto {
          @Type(() => Args1)
          @ValidateNested()
          args1: Args1
        }

        class Args2 {
          @IsString()
          name: string

          public static ValueOfGroupEntity(data: any) {
            data.description = data.description ?? '';
            return plainToClass(UpdateCityDto, data, {
              excludeExtraneousValues: true,
            });
          }
        
          public static ValueOfGroupEntityList(data: []) {
            return data.map((item) => UpdateCityDto.ValueOfGroupEntity(item));
          }
        }`
    }
  ]
})
