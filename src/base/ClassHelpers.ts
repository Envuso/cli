import {ClassDeclaration} from "ts-morph";

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

}
