export const STUB_CONTROLLER_W_MODELS = `
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
		const {{modelParamName}} = await {{modelName}}.query().find().limit(15).toArray();

		return response().json({{{modelParamName}}});
	}

	@get('/:{{modelParamName}}')
	public async get({{modelParamName}} : {{modelName}}) {
		return {{modelParamName}};
	}

	@put('/')
	public async store(@dto() body : StoreBody) {

	}

	@patch('/:{{modelParamName}}')
	public async update({{modelParamName}} : {{modelName}}, @dto() body : UpdateBody) {

	}

	@destroy('/:{{modelParamName}}')
	public async delete({{modelParamName}} : {{modelName}}) {

	}

}
`;
