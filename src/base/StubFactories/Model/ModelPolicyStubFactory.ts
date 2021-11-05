import * as path from "path";
import {StubFactory} from "../StubFactory";

export class ModelPolicyStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Policy';
	}

	public factory(args: { [key: string]: any }) {
		return `
export class {{name}} {

	public async view(user: User {{modelParam}}) {
		return true;
	}
	
	public async create(user: User) {
		return true;
	}
	
	public async delete(user: User {{modelParam}}) {
		return true;
	}
	
	public async update(user: User {{modelParam}}) {
		return true;
	}

}`
			.replaceAll('{{name}}', args._fileName)
			.replaceAll('{{modelParam}}', args.model ? `, model : ${args.model}` : '')
			;
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		if (!info.name.endsWith('Policy')) {
			info.name += 'Policy';
			info.base += 'Policy';
		}

		return path.normalize(
			path.join('.', 'src', 'Policies', path.format(info))
		);
	}
}
