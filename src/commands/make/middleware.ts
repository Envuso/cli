import {Command, flags} from '@oclif/command';
import {MiddlewareStubFactory} from "../../base/StubFactories/Middleware/MiddlewareStubFactory";
import { TsCompiler} from "../../base/TsCompiler";


export default class Middleware extends Command {

	static title = 'make:middleware';

	static description = 'Create a middleware';

	static examples = [
		`$ envuso make:middleware User`,
	];

	static flags = {
		help  : flags.help({char : 'h'}),
		force : flags.boolean({
			description : 'Force create the middleware, even if it exists.',
			char        : 'f',
			name        : 'force',
			type        : 'boolean',
			default     : false
		}),
	};

	static args = [
		{
			description : 'Set a name for your middleware(Does not need to contain "Middleware" this will be automatically added.)',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(Middleware);

		const stub = MiddlewareStubFactory;
		await TsCompiler.setup();
		await TsCompiler.generateStub(stub, args.name, {...args, ...flags});

	}
}
