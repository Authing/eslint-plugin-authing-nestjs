"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorByName = void 0;
function getDecoratorByName(node, name) {
    const result = (node.decorators || []).find(d => {
        const expression = d.expression && d.expression.type === 'CallExpression' && d.expression;
        return expression && expression.callee.type === 'Identifier' && expression.callee.name === name;
    });
    return result;
}
exports.getDecoratorByName = getDecoratorByName;
