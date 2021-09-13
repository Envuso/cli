import chalk from "chalk";
import rdl from "readline";

export const LogSymbols = {
	info       : chalk.blue('ℹ'),
	success    : chalk.green('✔'),
	warning    : chalk.yellow('⚠'),
	error      : chalk.red('✖'),
	rightArrow : chalk.bold('›'),
};

export class Spinner {
	private text: string = null;

	private spinnerFrames = process.platform === 'win32' ?
		['-', '\\', '|', '/'] :
		['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

	private timer: NodeJS.Timer = null;

	setText(text: string) {
		this.text = text;
	}

	start(text?: string) {
		if (this.timer !== null) {
			return;
		}

		if (text) {
			this.text = text;
		}

		process.stdout.write("\n");
		process.stdout.write("\x1B[?25l");

		let index       = 0;
		const drawFrame = () => {
			let now = this.spinnerFrames[index];

			if (now == undefined) {
				index = 0;
				now   = this.spinnerFrames[index];
			}

			process.stdout.write(`${chalk.bold.yellow(now)} ${this.text ? chalk.bold(this.text) : ''}`);
			process.stdout.cursorTo(0);

			index = index >= this.spinnerFrames.length ? 0 : index + 1;
		};

		drawFrame();

		this.timer = setInterval(() => {
			drawFrame();
		}, 80);
	}

	stop() {
		if (this.timer === null) {
			return;
		}

		clearInterval(this.timer);
		this.timer = null;

		process.stdout.cursorTo(0);
		process.stdout.clearLine(1);
	}
}
