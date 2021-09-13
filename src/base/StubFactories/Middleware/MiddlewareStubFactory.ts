import * as path from "path";
import {StubFactory} from "../StubFactory";

export class MiddlewareStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Middleware';
	}

	public factory(args: { [key: string]: any }) {
		return `
import {Middleware, RequestContext} from "@envuso/core/Routing";


export class {{name}} extends Middleware {

	public async handle(context: RequestContext) {

	}

}
`
			.replaceAll('{{name}}', args._fileName)
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		if (!info.name.endsWith('Middleware')) {
			info.name += 'Middleware';
			info.base += 'Middleware';
		}

		return path.normalize(
			path.join('.', 'src', 'App', 'Http', 'Middleware', path.format(info))
		);
	}
}
