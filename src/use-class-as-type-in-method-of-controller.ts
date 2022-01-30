import { getDecoratorByName } from './utils'
import { MethodDefinition } from 'estree'

const bodyParamMap = new Map()

export const useClassAsTypeInMethodOfController = {
	meta: {
		messages: {
			invalidTypeAnnotation: 'The parameter type annotation in the method of the controller must be a class'
		}
	},
	create(context) {
		return {
			TSInterfaceDeclaration(node) {
				const config = bodyParamMap.get(node.id.name)
				if (config) {
					context.report({
						node: config.node,
						messageId: 'invalidTypeAnnotation'
					})
				}
			},
			MethodDefinition: (node: MethodDefinition) => {
				// bodyParam: Pattern
				const bodyParam: any = node.value.params.find(p => getDecoratorByName(p, 'Body'))

				if (bodyParam) {
					const { typeAnnotation } = bodyParam
					bodyParamMap.set(typeAnnotation.typeAnnotation.typeName.name, {
						node
					})
				}
			}
		}
	}
}
