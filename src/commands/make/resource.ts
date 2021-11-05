import {Command, flags} from '@oclif/command';
import chalk from "chalk";
import {prompt} from "inquirer";
import {ApiResourceStubFactory} from "../../base/StubFactories/ApiResource/ApiResourceStubFactory";
import {ModelPolicyStubFactory} from "../../base/StubFactories/Model/ModelPolicyStubFactory";
import {ModelStubFactory} from "../../base/StubFactories/Model/ModelStubFactory";
import {TsCompiler} from "../../base/TsCompiler";
import {Log} from "../../base/Utility/Log";
import {LogSymbols} from "../../base/Utility/LogSymbols";

export default class Resource extends Command {

	static title = 'make:resource';

	static description = 'Create an api resource';

	static examples = [
		`$ envuso make:resource User --model=User`,
	];

	static flags = {
		help  : flags.help({char : 'h'}),
		model : flags.string({
			description : 'Create an api resource using your model',
			char        : 'm',
			name        : 'model',
			required    : true,
		}),
	};

	static args = [
		{
			description : 'Set a name for your api resource(Does not need to contain "Resource" this will be automatically added.)',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(Resource);

		const stub = ApiResourceStubFactory;

		if (!TsCompiler.hasModel(flags.model)) {
			Log.errorBanner(`Cannot find a model by the name of "${flags.model}"`)
			return;
		}

		await TsCompiler.setup();



		await TsCompiler.generateStub(stub, args.name, {...args, ...flags});
	}
}