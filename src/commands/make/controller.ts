import {Command, flags} from '@oclif/command';
import {prompt} from "inquirer";
import {ControllerCrudResourceStubFactory} from "../../base/StubFactories/Controller/ControllerCrudResourceStubFactory";
import {ControllerResourceStubFactory} from "../../base/StubFactories/Controller/ControllerResourceStubFactory";
import {ControllerStubFactory} from "../../base/StubFactories/Controller/ControllerStubFactory";
import {ModelStubFactory} from "../../base/StubFactories/Model/ModelStubFactory";
import { TsCompiler} from "../../base/TsCompiler";


export default class Controller extends Command {

	static title = 'make:controller';

	static description = 'Create a controller';

	static examples = [
		`$ envuso make:controller User`,
		`$ envuso make:controller User --resource`,
		`$ envuso make:controller User --resource --model=User `,
	];

	static flags = {
		help     : flags.help({char : 'h'}),
		resource : flags.boolean({
			description : 'Create a resource controller(Controller using GET, PUT, POST, PATCH, DELETE)',
			char        : 'r',
			name        : 'resource',
			type        : 'boolean',
			default     : false
		}),
		model    : flags.string({
			description : 'Create a resource controller using your model',
			char        : 'm',
			name        : 'model',
			dependsOn   : ['resource'],
		}),
		force    : flags.boolean({
			description : 'Force create the controller, even if it exists.',
			char        : 'f',
			name        : 'force',
			type        : 'boolean',
			default     : false
		}),
	};

	static args = [
		{
			description : 'Set a name for your controller(Does not need to contain "Controller" this will be automatically added.)',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(Controller);


		await TsCompiler.setup();

		let stub = ControllerStubFactory;
		if (flags.resource && !flags.model) {
			stub = ControllerResourceStubFactory;
		}
		if (flags.resource && flags.model) {
			stub = ControllerCrudResourceStubFactory;

			if (!TsCompiler.hasModel(flags.model)) {
				const result = await prompt({
					type    : 'confirm',
					name    : 'generate',
					message : "This model does not exist, would you like to generate it?"
				});

				if (result?.generate) {
					await TsCompiler.generateStub(ModelStubFactory, flags.model, {...{name : flags.model}, ...flags});
				}
			}

		}

		await TsCompiler.generateStub(stub, args.name, {...args, ...flags});

	}
}
