import {Command, flags} from "@oclif/command";
import * as path from "path";
import {TsCompiler} from "../../base/TsCompiler";
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

		await Build.run();

		await TsCompiler.setup();

		const {seedDatabase} = await import(path.join(process.cwd(), 'node_modules', '@envuso', 'core', 'Cli', 'CliHandler'));

		await seedDatabase(false);
	}
}
