import {Program} from "@envuso/compiler";
import {SubscriberResultData} from "@envuso/compiler/Utility/CliOutput";
import {Command, flags} from "@oclif/command";
import * as path from "path";
import {Observable} from "rxjs";
import {EnvusoProject} from "../../base/EnvusoProject";
import {TsCompiler} from "../../base/TsCompiler";
import {Log} from "../../base/Utility/Log";

export default class Seed extends Command {

	static description = 'Run your database seeders';

	static examples = [
		`$ envuso db:seed`,
		`$ envuso db:seed --fresh`,
	];

	static flags = {
		help  : flags.help({char : 'h'}),
		fresh : flags.boolean({
			description : 'If specified, this will drop your collection before running the seeder.',
			type        : 'boolean',
			default     : false,
			name        : 'fresh'
		}),
	};

	static args = [];

	async run() {
		const {args, flags} = this.parse(Seed);

		Log.info('Running typescript compiler first...');

		await TsCompiler.runTscCompiler();
		await TsCompiler.setup();

		if (flags.fresh) {
			await EnvusoProject.dropDatabase(true);
		}

		await EnvusoProject.seedDatabase();
	}
}
