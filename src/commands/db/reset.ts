import {Command, flags} from "@oclif/command";
import {EnvusoProject} from "../../base/EnvusoProject";

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
