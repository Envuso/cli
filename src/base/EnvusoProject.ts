import * as fs from "fs";

export class EnvusoProject {

	static isEnvusoDirectory() {
		const exists = fs.existsSync('package.json');

		if (!exists) {
			return false;
		}

		const file = JSON.parse(fs.readFileSync('package.json', {encoding : 'utf-8'}));

		return [
			...Object.keys(file.dependencies),
			...Object.keys(file.devDependencies),
		].some(pkg => pkg.includes('@envuso/core'));
	}

}
