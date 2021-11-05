import * as path from "path";
import {StubFactory} from "../StubFactory";

export class ModelPolicyStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Policy';
	}

	public factory(args: { [key: string]: any }) {
		return `
export class {{policyName}} {

	public async check(user: User) {
		return true;
	}

}`
			.replaceAll('{{policyName}}', args._fileName);
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		return path.normalize(
			path.join('.', 'src', 'Policies', path.format(info))
		);
	}
}
