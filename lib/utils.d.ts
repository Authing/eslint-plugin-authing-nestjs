import { Expression } from 'estree';
export declare type Decorator = {
    expression: Expression;
};
export declare function getDecoratorByName(node: any, name: string): Decorator | undefined;
