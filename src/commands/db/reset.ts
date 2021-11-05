import {Program} from "@envuso/compiler";
import {SubscriberResultData} from "@envuso/compiler/Utility/CliOutput";
import {Command, flags} from "@oclif/command";
import {prompt} from "inquirer";
import * as path from "path";
import {Observable} from "rxjs";
import {EnvusoProject} from "../../base/EnvusoProject";
import {TsCompiler} from "../../base/TsCompiler";
import {Log} from "../../base/Utility/Log";
import Build from "../build";

export default class Reset extends Command {

	static description = 'Reset your database';

	static examples = [
		`$ envuso db:reset`,
	];

	static flags = {
		help : flags.help({char : 'h'}),
	};

	static args = [];

	async run() {
		const {args, flags} = this.parse(Reset);

		try {
			await EnvusoProject.dropDatabase(true);
		} catch (error) {
			console.trace(error);
		}
	}
}
