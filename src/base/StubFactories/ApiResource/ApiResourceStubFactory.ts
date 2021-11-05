import * as path from "path";
import {ClassHelpers} from "../../ClassHelpers";
import {TsCompiler} from "../../TsCompiler";
import {Log} from "../../Utility/Log";
import {StubFactory} from "../StubFactory";

export class ApiResourceStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Resource';
	}

	public factory(args: { [key: string]: any }) {
		let properties = '';

		if (args.properties) {
			try {
				const props  = ClassHelpers.getPropertyNames(
					TsCompiler.getModelClass(args.model)
				);
				const values = [];
				for (let prop of props) {
					values.push(`${prop} : this.data.${prop}`);
				}
				properties = values.join(",\n");
			} catch (error) {
				Log.errorBanner(error.toString());
			}
		}

		return `
export class {{name}} extends ApiResource<{{model}}> {

	public transform(request: RequestContextContract): any {
		return {
			{{properties}}
		};
	}

}`
			.replaceAll('{{name}}', args._fileName)
			.replaceAll('{{properties}}', properties)
			.replaceAll('{{model}}', args.model);
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		return path.normalize(
			path.join('.', 'src', 'App', 'Http', 'Resources', path.format(info))
		);
	}
}
