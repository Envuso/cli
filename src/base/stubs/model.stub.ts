export const STUB_MODEL = `
import {Exclude, Expose, Type} from "class-transformer";
import {IsEmail, IsNotEmpty} from "class-validator";
import {id, Model} from "@envuso/core/Database";
import {ObjectId} from "mongodb";

export class {{name}} extends Model<{{name}}> {

	@id
	_id: ObjectId;

}`
