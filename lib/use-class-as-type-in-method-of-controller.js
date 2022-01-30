"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClassAsTypeInMethodOfController = void 0;
const utils_1 = require("./utils");
const bodyParamMap = new Map();
exports.useClassAsTypeInMethodOfController = {
    meta: {
        messages: {
            invalidTypeAnnotation: 'The parameter type annotation in the method of the controller must be a class'
        }
    },
    create(context) {
        return {
            TSInterfaceDeclaration(node) {
                const config = bodyParamMap.get(node.id.name);
                if (config) {
                    context.report({
                        node: config.node,
                        messageId: 'invalidTypeAnnotation'
                    });
                }
            },
            MethodDefinition: (node) => {
                // bodyParam: Pattern
                const bodyParam = node.value.params.find(p => (0, utils_1.getDecoratorByName)(p, 'Body'));
                if (bodyParam) {
                    const { typeAnnotation } = bodyParam;
                    bodyParamMap.set(typeAnnotation.typeAnnotation.typeName.name, {
                        node
                    });
                }
            }
        };
    }
};
