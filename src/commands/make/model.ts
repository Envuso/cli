import {Command, flags} from '@oclif/command';
import chalk from "chalk";
import {ModelStubFactory} from "../../base/StubFactories/Model/ModelStubFactory";
import {StubGenerator} from "../../base/StubGenerator";
import {SetupType, TsCompiler} from "../../base/TsCompiler";

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

		await TsCompiler.setup(SetupType.MODEL);
		await TsCompiler.generateStub(stub, args.name, {...args, ...flags});

		//		const generator = new StubGenerator(
		//			'MODEL',
		//			'Model',
		//			['src', 'App', 'Models'],
		//			args.name,
		//			false
		//		);
		//
		//		generator.replace({});
		//
		//		if (!await generator.prepareToCreateFile()) {
		//			this.warn(chalk.yellow('Model was not created at: ' + generator.creationPath));
		//
		//			return;
		//		}
		//
		//		generator.save();
	}
}
