import { MethodDefinition } from 'estree';
export declare const forbidReadBodyFromReq: {
    meta: {
        messages: {
            invalidBodyFromReq: string;
        };
    };
    create(context: any): {
        MemberExpression(node: any): void;
        MethodDefinition: (node: MethodDefinition) => void;
    };
};
