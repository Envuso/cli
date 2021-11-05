import {Command, flags} from '@oclif/command';
import chalk from "chalk";
import {Decorator} from "ts-morph";
import {ClassHelpers} from "../../base/ClassHelpers";
import {ModelPolicyStubFactory} from "../../base/StubFactories/Model/ModelPolicyStubFactory";
import {ModelStubFactory} from "../../base/StubFactories/Model/ModelStubFactory";
import {StubFactory} from "../../base/StubFactories/StubFactory";
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
		model : flags.string({
			description : 'Define the model that this policy is for, the @policy decorator will be automatically added.',
			char        : 'm',
			name        : 'model',
			default     : null
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
		const sourceFile = await TsCompiler.generateStub(stub, args.name, {...args, ...flags});

		if (flags.model) {
			try {
				const model = TsCompiler.getModelClass(flags.model);

				const policyClass = sourceFile.getClasses()[0];

				if (ClassHelpers.hasModelPolicyDecorator(policyClass.getName(), model)) {
					Log.new('Skipping adding decorator to model. It looks like one is already defined.');
					return;
				}

				model.addDecorator({
					name      : "policy",
					arguments : [policyClass.getName()],
				});

				const modelSource = model.getSourceFile();

				modelSource.fixMissingImports(StubFactory.formatSettings(), StubFactory.formatPreferences());
				await modelSource.save();
				await modelSource.refreshFromFileSystem();
			} catch (error) {
				Log.errorBanner("Failed to add @policy decorator to model, reason:");
				console.error(error);
			}
		}
	}
}
