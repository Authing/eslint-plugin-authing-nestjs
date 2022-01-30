"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClassValidatorToDto = void 0;
const utils_1 = require("./utils");
const bodyParamMap = new Map();
exports.useClassValidatorToDto = {
    meta: {
        messages: {
            invalidDtoClassValidator: 'Each dto field must have a class validator',
            invalidDtoClassValidatorLength: 'There must be at least 2 class validators for a dto item with IsOptional'
        }
    },
    create(context) {
        return {
            ClassDeclaration(node) {
                var _a;
                const config = bodyParamMap.get((_a = node.id) === null || _a === void 0 ? void 0 : _a.name);
                if (!config) {
                    return;
                }
                // nodeItem: MethodDefinition | PropertyDefinition
                node.body.body.forEach((nodeItem) => {
                    var _a;
                    if (!((_a = nodeItem.decorators) === null || _a === void 0 ? void 0 : _a.length)) {
                        context.report({
                            node: config.node,
                            messageId: 'invalidDtoClassValidator'
                        });
                    }
                    else if (nodeItem.decorators.find(decorator => decorator.expression.callee.name === 'IsOptional') &&
                        nodeItem.decorators.length < 2) {
                        context.report({
                            node: config.node,
                            messageId: 'invalidDtoClassValidatorLength'
                        });
                    }
                });
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
