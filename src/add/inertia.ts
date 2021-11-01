//import {Command} from '@oclif/command';
//import ux from "cli-ux";
//import {TsCompiler} from "../../base/TsCompiler";
//import {LogSymbols} from "../../base/Utility/LogSymbols";
//
//export default class Inertia extends Command {
//
//	static description = 'Add inertia to Envuso';
//
//	static examples = [
//		`$ envuso add:inertia`,
//	];
//
//	static flags = {};
//
//	static args = [];
//
//	async run() {
//		const {args, flags} = this.parse(Inertia);
//		await TsCompiler.setup();
//
//		ux.action.start(`${LogSymbols.rightArrow} Check service providers`);
//
//
//		if (!TsCompiler.hasServiceProvider('InertiaServiceProvider')) {
//			TsCompiler.getServiceProvidersArray().addElement('InertiaServiceProvider');
//			await TsCompiler.getServiceProvidersArray().getSourceFile().save();
//			ux.action.stop(`${LogSymbols.success} Successfully updated.`);
//		} else {
//			ux.action.stop(`${LogSymbols.success} No update required`);
//		}
//	}
//
//}
