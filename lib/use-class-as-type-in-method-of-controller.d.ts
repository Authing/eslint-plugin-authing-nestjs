import { MethodDefinition } from 'estree';
export declare const useClassAsTypeInMethodOfController: {
    meta: {
        messages: {
            invalidTypeAnnotation: string;
        };
    };
    create(context: any): {
        TSInterfaceDeclaration(node: any): void;
        MethodDefinition: (node: MethodDefinition) => void;
    };
};
