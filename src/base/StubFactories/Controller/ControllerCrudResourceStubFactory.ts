import * as path from "path";
import {StubFactory} from "../StubFactory";

export class ControllerCrudResourceStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Crud Resource Controller';
	}

	public factory(args: { [key: string]: any }) {
		return `
import {Controller, controller, response, get, put, post, patch, destroy, middleware, param, dto, DataTransferObject} from "@envuso/core/Routing";

class StoreBody extends DataTransferObject {

}
class UpdateBody extends DataTransferObject {

}

//@middleware()
@controller('/')
export class {{name}} extends Controller {

	@get('/')
	public async list() {
		return response().json(
			await {{modelName}}.query().paginate(15)
		);
	}

	@get('/:{{modelParamName}}')
	public async get({{modelParamName}} : {{modelName}}) {
		return {{modelParamName}};
	}

	@put('/')
	public async store(@dto() body : StoreBody) {		
		return response().json(
			await {{modelName}}.create(body)
		);	
	}

	@patch('/:{{modelParamName}}')
	public async update({{modelParamName}} : {{modelName}}, @dto() body : UpdateBody) {
		await {{modelParamName}}.update(body);
		
		return response().json({});		
	}

	@destroy('/:{{modelParamName}}')
	public async delete({{modelParamName}} : {{modelName}}) {
		await {{modelParamName}}.delete();
		
		return response().json({});	
	}

}
		`
			.replaceAll('{{name}}', args._fileName)
			.replaceAll('{{modelParamName}}', args.model.toString().toLowerCase())
			.replaceAll('{{modelName}}', args.model.toString());
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
