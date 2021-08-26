export const STUB_RESOURCE_CONTROLLER = `
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
