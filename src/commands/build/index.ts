import {Program, ConfigMetaGenerator, ControllerMetaGenerator, GenerateTypesFile, ModuleMetaGenerator} from "@envuso/compiler";
import {Command, flags} from "@oclif/command";
import {EnvusoProject} from "../../base/EnvusoProject";
import {TsCompiler} from "../../base/TsCompiler";
import {LogSymbols} from "../../base/Utility/LogSymbols";

export default class Build extends Command {

	static description = 'Build envuso';

	static examples = [
		`$ envuso build`,
		`$ envuso build --watch`,
	];

	static flags = {
		help  : flags.help({char : 'h'}),
		watch : flags.boolean({
			char        : 'w',
			default     : false,
			description : 'Runs the compiler in watch mode. Any changes will trigger a re-build.'
		}),
	};

	static args = [];

	async run() {
		const {args, flags} = this.parse(Build);

		await TsCompiler.setup();

		if (!EnvusoProject.isEnvusoDirectory()) {
			console.log(`${LogSymbols.error} You must be in the root of your Envuso project to build.`);
			return;
		}

		await Program.loadConfiguration();
		await Program.setup([
			GenerateTypesFile,
			ConfigMetaGenerator,
			ControllerMetaGenerator,
			ModuleMetaGenerator,
		]);
		await Program.run(flags.watch);
	}
}
