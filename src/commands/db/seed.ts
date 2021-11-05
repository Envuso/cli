import {Program} from "@envuso/compiler";
import {SubscriberResultData} from "@envuso/compiler/Utility/CliOutput";
import {Command, flags} from "@oclif/command";
import * as path from "path";
import {Observable} from "rxjs";
import {TsCompiler} from "../../base/TsCompiler";
import {Log} from "../../base/Utility/Log";
import Build from "../build";

export default class Seed extends Command {

	static description = 'Run your database seeders';

	static examples = [
		`$ envuso db:seed`,
	];

	static flags = {
		help : flags.help({char : 'h'}),
	};

	static args = [];

	async run() {
		const {args, flags} = this.parse(Seed);

		Log.new('Running typescript compiler first...');

		await TsCompiler.buildProject(false, true);

		await TsCompiler.setup();

		const {seedDatabase} = await import(path.join(process.cwd(), 'node_modules', '@envuso', 'core', 'Cli', 'CliHandler'));

		await seedDatabase(false);
	}
}
