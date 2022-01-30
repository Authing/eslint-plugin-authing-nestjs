"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidReadBodyFromReq = void 0;
const utils_1 = require("./utils");
let reqName = 'req';
exports.forbidReadBodyFromReq = {
    meta: {
        messages: {
            invalidBodyFromReq: 'It is forbidden to read body from Req'
        }
    },
    create(context) {
        return {
            MemberExpression(node) {
                if (node.object.name === reqName && node.property.name === 'body') {
                    reqName = '';
                    context.report({
                        node,
                        messageId: 'invalidBodyFromReq'
                    });
                }
            },
            MethodDefinition: (node) => {
                // reqParam: Pattern
                const reqParam = node.value.params.find(p => (0, utils_1.getDecoratorByName)(p, 'Req'));
                if (reqParam) {
                    reqName = reqParam.name;
                }
            }
        };
    }
};
