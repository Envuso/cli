import {Command, flags} from '@oclif/command';
import {SocketChannelListenerStubFactory} from "../../base/StubFactories/Sockets/SocketChannelListenerStubFactory";
import {TsCompiler} from "../../base/TsCompiler";


export default class SocketChannelListener extends Command {

	static title = 'make:socket-channel-listener';

	static description = 'Create a socket channel';

	static examples = [
		`$ envuso make:socket-channel-listener UserSocketChannel`,
	];

	static flags = {
		help     : flags.help({char : 'h'}),
		force    : flags.boolean({
			description : 'Force create, even if it exists.',
			char        : 'f',
			name        : 'force',
			type        : 'boolean',
			default     : false
		}),
	};

	static args = [
		{
			description : 'Set a name for your socket channel',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(SocketChannelListener);

		await TsCompiler.setup();
		await TsCompiler.generateStub(SocketChannelListenerStubFactory, args.name, {...args, ...flags});

	}
}
