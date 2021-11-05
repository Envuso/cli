import {ClassDeclaration, Decorator} from "ts-morph";

export class ClassHelpers {

	/**
	 * Pull the directly defined property names from a class
	 *
	 * @param {ClassDeclaration} classDec
	 * @returns {string[]}
	 */
	public static getPropertyNames(classDec: ClassDeclaration): string[] {
		return classDec.getProperties().map(p => {
			return p.getName();
		});
	}

	public static hasModelPolicyDecorator(policyClassName: string, model: ClassDeclaration) {
		const dec = model.getDecorator((decorator: Decorator) => {
			return decorator.getName() === 'policy' && decorator.getArguments().some(arg => {
				console.log('Decorator arg: ', arg.getText());
				return arg.getText() === policyClassName;
			});
		});

		return !!dec;
	}

}
