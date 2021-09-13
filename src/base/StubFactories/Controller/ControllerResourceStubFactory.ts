import * as path from "path";
import {StubFactory} from "../StubFactory";
import {factory} from 'typescript';
import {ts} from "ts-morph";

export class ControllerResourceStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Resource Controller';
	}

	public factory(args: { [key: string]: any }) {
		return `
import {Controller, controller, get, put, post, patch, destroy, middleware, param, dto, DataTransferObject} from "@envuso/core/Routing";

class StoreBody extends DataTransferObject {

}
class UpdateBody extends DataTransferObject {

}

//@middleware()
@controller('/')
export class {{name}} extends Controller {

	@get('/')
	public async list() {

	}

	@get('/:id')
	public async get(@param id : string) {

	}

	@put('/')
	public async store(@dto() body : StoreBody) {

	}

	@patch('/:id')
	public async update(@param id :string, @dto() body : UpdateBody) {

	}

	@destroy('/:id')
	public async delete(@param id :string) {

	}

}
		`
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
