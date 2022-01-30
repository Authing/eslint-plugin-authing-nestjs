"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const forbid_body_parameters_1 = require("./forbid-body-parameters");
const forbid_read_body_from_req_1 = require("./forbid-read-body-from-req");
const use_class_as_type_in_method_of_controller_1 = require("./use-class-as-type-in-method-of-controller");
const use_class_validator_to_dto_1 = require("./use-class-validator-to-dto");
exports.rules = {
    'forbid_body_parameters': forbid_body_parameters_1.forbidBodyParameters,
    'forbid_read_body_from_req': forbid_read_body_from_req_1.forbidReadBodyFromReq,
    'use_class_as_type_in_method_of_controller': use_class_as_type_in_method_of_controller_1.useClassAsTypeInMethodOfController,
    'use_class_validator_to_dto': use_class_validator_to_dto_1.useClassValidatorToDto
};
exports.configs = {
    recommended: {
        rules: {
            'authing-nestjs/forbid_body_parameter': 1,
            'authing-nestjs/forbid_read_body_from_req': 1,
            'authing-nestjs/use_class_as_type_in_method_of_controller': 1,
            'authing-nestjs/use_class_validator_to_dto': 1
        }
    }
};
