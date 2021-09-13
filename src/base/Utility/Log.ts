import chalk from "chalk";
import {Spinner} from "./LogSymbols";

export class Log {

	private static spinner: Spinner = new Spinner();

	static errorBanner(message: string) {
		let chars = '';
		for (let i = 0; i < 6; i++) {
			chars += ' ';
		}
		process.stdout.write(`\n`);
		process.stdout.write(`\n`);
		process.stdout.write(chalk.bold.bgRed`${chars}${message}${chars}\n`);
		process.stdout.write(`\n`);
	}

	static update(message: string) {
		process.stdout.cursorTo(0);
		process.stdout.clearLine(0);
		process.stdout.write(message);
	}

	static new(message: string) {
		process.stdout.write(`\n${message}`);
	}

	static startSpinner(message?: string) {
		this.spinner.setText(message ?? '');
		this.spinner.start();
	}

	static setSpinnerText(message?: string) {
		this.spinner.setText(message ?? '');
	}

	static stopSpinner() {
		this.spinner.stop();
		this.spinner.setText('');
	}

}
