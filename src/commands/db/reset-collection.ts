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

export default class ResetCollection extends Command {

	static description = 'Reset a collection in your database';

	static examples = [
		`$ envuso db:reset-collection users`,
	];

	static flags = {
		help : flags.help({char : 'h'}),
	};

	static args = [
		{
			description : 'The name of the collection you want to reset',
			name        : 'name',
			type        : 'string',
			required    : true,
		}
	];

	async run() {
		const {args, flags} = this.parse(ResetCollection);

		try {
			await EnvusoProject.dropCollection(true, args.name);
		} catch (error) {
			console.trace(error);
		}
	}
}
