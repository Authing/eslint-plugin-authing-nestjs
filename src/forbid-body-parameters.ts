import { Decorator, getDecoratorByName } from './utils'
import { MethodDefinition, CallExpression } from 'estree'

const bodyParamMap = new Map()

export const messages = {
	invalidArgument: 'It is forbidden to use parameters in the @Body'
}

export const forbidBodyParameters = {
	meta: {
		messages
	},
	create(context) {
		return {
			MethodDefinition: (node: MethodDefinition) => {
				// bodyParam: Pattern
				const bodyParam: any = node.value.params.find(p => getDecoratorByName(p, 'Body'))

				if (bodyParam) {
					const bodyDecorator: Decorator | undefined = getDecoratorByName(bodyParam, 'Body')
					if ((bodyDecorator?.expression as CallExpression).arguments.length) {
						context.report({ node: bodyDecorator, messageId: 'invalidArgument' })
						return
					}

					const { typeAnnotation } = bodyParam
					bodyParamMap.set(typeAnnotation.typeAnnotation.typeName.name, {
						node
					})
				}
			}
		}
	}
}
