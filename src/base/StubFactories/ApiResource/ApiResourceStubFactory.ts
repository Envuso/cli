import * as path from "path";
import {StubFactory} from "../StubFactory";

export class ApiResourceStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Resource';
	}

	public factory(args: { [key: string]: any }) {
		return `
export class {{name}} extends ApiResource<{{model}}> {

	public transform(request: RequestContextContract): any {
		return {
		};
	}

}`
			.replaceAll('{{name}}', args._fileName)
			.replaceAll('{{model}}', args.model);
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		return path.normalize(
			path.join('.', 'src', 'App', 'Http', 'Resources', path.format(info))
		);
	}
}
