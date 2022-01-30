import { MethodDefinition, ClassDeclaration } from 'estree';
export declare const useClassValidatorToDto: {
    meta: {
        messages: {
            invalidDtoClassValidator: string;
            invalidDtoClassValidatorLength: string;
        };
    };
    create(context: any): {
        ClassDeclaration(node: ClassDeclaration): void;
        MethodDefinition: (node: MethodDefinition) => void;
    };
};
