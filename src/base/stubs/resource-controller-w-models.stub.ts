export const STUB_CONTROLLER_W_MODELS = `
import {Controller, controller, response, get, put, post, patch, destroy, middleware, param, dto, DataTransferObject} from "@envuso/core/Routing";
import {{{modelName}}} from "{{modelPath}}";

class StoreBody extends DataTransferObject {

}
class UpdateBody extends DataTransferObject {

}

//@middleware()
@controller('/')
export class {{name}} extends Controller {

	@get('/')
	public async list() {
		const {{modelParamName}} = await {{modelName}}.query().paginate(15);

		return response().json({{{modelParamName}}});
	}

	@get('/:{{modelParamName}}')
	public async get({{modelParamName}} : {{modelName}}) {
		return {{modelParamName}};
	}

	@put('/')
	public async store(@dto() body : StoreBody) {
		const {{modelParamName}} = await {{modelName}}.create(body);
		
		return response().json({{modelParamName}});	
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
`;
