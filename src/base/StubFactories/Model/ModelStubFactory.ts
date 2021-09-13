import * as path from "path";
import {StubFactory} from "../StubFactory";

export class ModelStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Model';
	}

	public factory(args: { [key: string]: any }) {
		return `
import {Exclude, Expose, Type} from "class-transformer";
import {IsEmail, IsNotEmpty} from "class-validator";
import {id, Model} from "@envuso/core/Database";
import {ObjectId} from "mongodb";

export class {{name}} extends Model<{{name}}> {

	@id
	_id: ObjectId;

}`
			.replaceAll('{{name}}', args._fileName)
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);

		return path.normalize(
			path.join('.', 'src', 'App', 'Models', path.format(info))
		);
	}
}
