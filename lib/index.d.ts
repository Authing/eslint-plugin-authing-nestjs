export declare const rules: {
    forbid_body_parameters: {
        meta: {
            messages: {
                invalidArgument: string;
            };
        };
        create(context: any): {
            MethodDefinition: (node: import("estree").MethodDefinition) => void;
        };
    };
    forbid_read_body_from_req: {
        meta: {
            messages: {
                invalidBodyFromReq: string;
            };
        };
        create(context: any): {
            MemberExpression(node: any): void;
            MethodDefinition: (node: import("estree").MethodDefinition) => void;
        };
    };
    use_class_as_type_in_method_of_controller: {
        meta: {
            messages: {
                invalidTypeAnnotation: string;
            };
        };
        create(context: any): {
            TSInterfaceDeclaration(node: any): void;
            MethodDefinition: (node: import("estree").MethodDefinition) => void;
        };
    };
    use_class_validator_to_dto: {
        meta: {
            messages: {
                invalidDtoClassValidator: string;
                invalidDtoClassValidatorLength: string;
            };
        };
        create(context: any): {
            ClassDeclaration(node: import("estree").ClassDeclaration): void;
            MethodDefinition: (node: import("estree").MethodDefinition) => void;
        };
    };
};
export declare const configs: {
    recommended: {
        rules: {
            forbid_body_parameter: number;
            forbid_read_body_from_req: number;
            use_class_as_type_in_method_of_controller: number;
            use_class_validator_to_dto: number;
        };
    };
};
