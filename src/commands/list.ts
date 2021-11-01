import {Command} from '@oclif/command';
import ux from "cli-ux";
import {sortBy, template} from "lodash";
import {EOL} from "os";

export default class List extends Command {

	static description = 'List all commands';

	static examples = [
		`$ envuso list`,
	];

	static flags = {};

	static args = [];

	async run() {
		const {args, flags} = this.parse(List);
		const config        = this.config;
		let commands        = config.commands;

		commands = sortBy(commands, 'id').map(command => {
			command.description = (typeof command.description === 'string' && template(command.description)({command, config})) || undefined;
			command.usage       = (typeof command.usage === 'string' && template(command.usage)({command, config})) || undefined;
			return command;
		});

		ux.table(commands.map(command => {
			command.description = (command.description || '').split(EOL)[0];
			command.hidden      = Boolean(command.hidden);
			command.usage       = (command.usage || '');
			return command;
		}), {
			id          : {
				header : 'Command',
			},
			description : {},
			usage       : {
				extended : true,
			},
			pluginName  : {
				extended : true,
				header   : 'Plugin',
			},
			pluginType  : {
				extended : true,
				header   : 'Type',
			},
			hidden      : {
				extended : true,
			},
		}, {
			printLine : this.log,
		});
	}

}
