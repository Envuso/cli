import {Command, flags} from '@oclif/command';
import chalk from "chalk";
import {ModelPolicyStubFactory} from "../../base/StubFactories/Model/ModelPolicyStubFactory";
import {ModelStubFactory} from "../../base/StubFactories/Model/ModelStubFactory";
import {TsCompiler} from "../../base/TsCompiler";
import {Log} from "../../base/Utility/Log";
import {LogSymbols} from "../../base/Utility/LogSymbols";

export default class Policy extends Command {

	static title = 'make:policy';

	static description = 'Create a model policy';

	static examples = [
		`$ envuso make:policy User`,
	];

	static flags = {
		help  : flags.help({char : 'h'}),
		force : flags.boolean({
			description : 'Force create the model, even if it exists.',
			char        : 'f',
			name        : 'force',
			type        : 'boolean',
			default     : false
		}),
	};

	static args = [
		{
			description : 'Set a name for your model policy(Does not need to contain "Policy" this will be automatically added.)',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(Policy);

		const stub = ModelPolicyStubFactory;

		await TsCompiler.setup();
		await TsCompiler.generateStub(stub, args.name, {...args, ...flags});

		Log.new(`Don't forget to add "@policy(${args.name})" to your Model.`);

	}
}
