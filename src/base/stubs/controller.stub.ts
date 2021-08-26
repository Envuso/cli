export const STUB_CONTROLLER = `
import {Controller, controller, get, put, post, patch, destroy, middleware} from "@envuso/core/Routing";

//@middleware()
@controller('/')
export class {{name}} extends Controller {

	@get('/')
	public async index() {

	}

}`
