import * as path from "path";
import {StubFactory} from "../StubFactory";

export class ControllerStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Controller';
	}

	public factory(args: { [key: string]: any }) {
		return `
import {Controller, controller, get, put, post, patch, destroy, middleware} from "@envuso/core/Routing";

//@middleware()
@controller('/')
export class {{name}} extends Controller {

	@get('/')
	public async index() {

	}

}`
			.replaceAll('{{name}}', args._fileName)
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		if (!info.name.endsWith('Controller')) {
			info.name += 'Controller';
			info.base += 'Controller';
		}

		return path.normalize(
			path.join('.', 'src', 'App', 'Http', 'Controllers', path.format(info))
		);
	}
}
