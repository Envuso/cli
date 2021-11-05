import * as fs from "fs";
import {prompt} from "inquirer";
import path from "path";
import {TsCompiler} from "./TsCompiler";
import chalk from "chalk";
import {Log} from "./Utility/Log";

export class EnvusoProject {

	static isEnvusoDirectory() {
		const exists = fs.existsSync('package.json');

		if (!exists) {
			return false;
		}

		const file = JSON.parse(fs.readFileSync('package.json', {encoding : 'utf-8'}));

		return [
			...Object.keys(file.dependencies),
			...Object.keys(file.devDependencies),
		].some(pkg => pkg.includes('@envuso/core'));
	}

	static async getCliHandler() {
		return await import(path.join(process.cwd(), 'node_modules', '@envuso', 'core', 'Cli', 'CliHandler'));
	}

	static async seedDatabase() {
		await TsCompiler.setup();
		const {seedDatabase} = await EnvusoProject.getCliHandler();

		try {
			await seedDatabase(false);
		} catch (error) {
			console.error(error);
		}
	}

	static async dropDatabase(confirm: boolean = false) {
		if (confirm) {
			const result = await prompt({
				type    : 'confirm',
				name    : 'reset',
				message : chalk.yellow(`Are you sure you want to do this? This will ${chalk.bold('drop')} your mongodb database ${chalk.bold(`"${name}"`)}.`)
			});

			if (!result.reset) {
				process.exit(0);
				return;
			}
		}

		await TsCompiler.setup();

		const {resetDb} = await EnvusoProject.getCliHandler();

		try {
			await resetDb(false);

			Log.success('Successfully dropped database.');

		} catch (error) {
			console.error(error);
		}
	}

	static async dropCollection(confirm: boolean = false, name: string) {
		if (!name) {
			return;
		}

		if (confirm) {
			const result = await prompt({
				type    : 'confirm',
				name    : 'reset',
				message : chalk.yellow(`Are you sure you want to do this? This will ${chalk.bold('drop')} your mongodb collection ${chalk.bold(`"${name}"`)}.`)
			});

			if (!result.reset) {
				process.exit(0);
				return;
			}
		}

		await TsCompiler.setup();

		const {resetCollection} = await EnvusoProject.getCliHandler();

		await resetCollection(false, name);

		try {
			await resetCollection(false);

			Log.success(`Successfully dropped collection "${name}"`);
		} catch (error) {
			console.error(error);
		}
	}
}
