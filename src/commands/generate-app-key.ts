import {Command, flags} from '@oclif/command';
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import {parse, stringify} from 'envfile';

export default class GenerateAppKey extends Command {

	static description = 'Generate a new app encryption key';

	static examples = [
		`$ envuso generate-app-key`,
	];

	static flags = {
		help : flags.help({char : 'h'}),
	};

	static args = [];

	async run() {
		const {args, flags} = this.parse(GenerateAppKey);
		const cwd           = process.cwd();

		const envPath = path.join(cwd, '.env');

		if (!fs.existsSync(envPath)) {
			this.warn('No .env file exists in the current directory: ' + cwd);

			return;
		}

		const envData = parse(envPath);

		envData.APP_KEY = crypto.randomBytes(16).toString('hex');

		fs.writeFileSync(
			envPath, stringify(envData)
		);


		return this.log(chalk.green((process.platform === 'win32' ? '»' : '›' ) + ` Successfully re-generated app key.`));
	}

}
