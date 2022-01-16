import {Command, flags} from '@oclif/command';
import {DataTransferObjectStubFactory} from "../../base/StubFactories/DataTransferObjects/DataTransferObjectStubFactory";
import {MiddlewareStubFactory} from "../../base/StubFactories/Middleware/MiddlewareStubFactory";
import {TsCompiler} from "../../base/TsCompiler";


export default class Dto extends Command {

	static title = 'make:dto';

	static description = 'Create a data transfer object';

	static examples = [
		`$ envuso make:dto LoginInformation`,
	];

	static flags = {
		help  : flags.help({char : 'h'}),
		force : flags.boolean({
			description : 'Force create the dto, even if it exists.',
			char        : 'f',
			name        : 'force',
			type        : 'boolean',
			default     : false
		}),
	};

	static args = [
		{
			description : 'Set a name for your dto(Does not need to contain "DataTransferObject" this will be automatically added.)',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(Dto);

		const stub = DataTransferObjectStubFactory;
		await TsCompiler.setup();
		await TsCompiler.generateStub(stub, args.name, {...args, ...flags});

	}
}
