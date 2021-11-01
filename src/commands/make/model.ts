import {Command, flags} from '@oclif/command';
import {ModelStubFactory} from "../../base/StubFactories/Model/ModelStubFactory";
import {TsCompiler} from "../../base/TsCompiler";

export default class Model extends Command {

	static title = 'make:middleware';

	static description = 'Create a middleware';

	static examples = [
		`$ envuso make:middleware User`,
	];

	static flags = {
		help  : flags.help({char : 'h'}),
		force : flags.boolean({
			description : 'Force create the controller, even if it exists.',
			char        : 'f',
			name        : 'force',
			type        : 'boolean',
			default     : false
		}),
	};

	static args = [
		{
			description : 'Set a name for your middleware(Does not need to contain "Model" this will be automatically added.)',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(Model);

		const stub = ModelStubFactory;

		await TsCompiler.setup();
		await TsCompiler.generateStub(stub, args.name, {...args, ...flags});
	}
}
