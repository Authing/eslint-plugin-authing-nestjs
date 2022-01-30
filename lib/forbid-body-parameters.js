"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidBodyParameters = void 0;
const utils_1 = require("./utils");
const bodyParamMap = new Map();
exports.forbidBodyParameters = {
    meta: {
        messages: {
            invalidArgument: 'It is forbidden to use parameters in the @Body'
        }
    },
    create(context) {
        return {
            MethodDefinition: (node) => {
                // bodyParam: Pattern
                const bodyParam = node.value.params.find(p => (0, utils_1.getDecoratorByName)(p, 'Body'));
                if (bodyParam) {
                    const bodyDecorator = (0, utils_1.getDecoratorByName)(bodyParam, 'Body');
                    if ((bodyDecorator === null || bodyDecorator === void 0 ? void 0 : bodyDecorator.expression).arguments.length) {
                        context.report({ node: bodyDecorator, messageId: 'invalidArgument' });
                        return;
                    }
                    const { typeAnnotation } = bodyParam;
                    bodyParamMap.set(typeAnnotation.typeAnnotation.typeName.name, {
                        node
                    });
                }
            }
        };
    }
};
