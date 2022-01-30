import { MethodDefinition } from 'estree';
export declare const forbidBodyParameters: {
    meta: {
        messages: {
            invalidArgument: string;
        };
    };
    create(context: any): {
        MethodDefinition: (node: MethodDefinition) => void;
    };
};
