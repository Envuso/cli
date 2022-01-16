import * as path from "path";
import {StubFactory} from "../StubFactory";

export class DataTransferObjectStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Data Transfer Object';
	}

	public factory(args: { [key: string]: any }) {
		return `
import {DataTransferObject} from "@envuso/core/Routing";

class {{name}} extends DataTransferObject {

}`
			.replaceAll('{{name}}', args._fileName)
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		return path.normalize(
			path.join('.', 'src', 'App', 'DataTransferObjects', path.format(info))
		);
	}
}
