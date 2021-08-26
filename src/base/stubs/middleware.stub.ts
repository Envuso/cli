export const STUB_MIDDLEWARE = `
import {Middleware, RequestContext} from "@envuso/core/Routing";


export class {{name}} extends Middleware {

	public async handle(context: RequestContext) {

	}

}
`
