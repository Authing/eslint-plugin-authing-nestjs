import { forbidBodyParameters } from './forbid-body-parameters/forbid-body-parameters'
import { forbidReadBodyFromReq } from './forbid-read-body-from-req/forbid-read-body-from-req'
import { useClassAsTypeInMethodOfController } from './use-class-as-type-in-method-of-controller/use-class-as-type-in-method-of-controller'
import { useClassValidatorToDto } from './use-class-validator-to-dto/use-class-validator-to-dto'

export const rules = {
  forbid_body_parameters: forbidBodyParameters,
  forbid_read_body_from_req: forbidReadBodyFromReq,
  use_class_as_type_in_method_of_controller: useClassAsTypeInMethodOfController,
  use_class_validator_to_dto: useClassValidatorToDto
}

export const configs = {
  recommended: {
    rules: {
      'authing-nestjs/forbid_body_parameters': 1,
      'authing-nestjs/forbid_read_body_from_req': 1,
      'authing-nestjs/use_class_as_type_in_method_of_controller': 1,
      'authing-nestjs/use_class_validator_to_dto': 1
    }
  }
}
