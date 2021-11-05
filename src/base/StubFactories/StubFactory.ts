import chalk from "chalk";
import * as fs from 'fs-extra';
import * as path from "path";
import {printNode, Project, ScriptKind, SourceFile, UserPreferences} from "ts-morph";
import {Log} from "../Utility/Log";
import {LogSymbols} from "../Utility/LogSymbols";

export abstract class StubFactory {

	public static factoryOutputName() {
		return null;
	}

	public create(args: { [key: string]: any }): string {
		return "";
	}

	abstract factory(args: { [key: string]: any });

	abstract normalizeFilePath(filePath: string);

	private handleRegularPathNormalization(filePath: string) {
		if (filePath.endsWith('.ts')) {
			filePath = filePath.replace('.ts', '');
		}

		return filePath;
	}

	public async generate(project: Project, filePath: string, args: { [key: string]: any }): Promise<SourceFile> {
		filePath = this.handleRegularPathNormalization(filePath);
		filePath = this.normalizeFilePath(filePath);

		await this.createDirectoryIfNotExisting(filePath);

		if (!filePath.endsWith('.ts')) {
			filePath += '.ts';
		}

		if (await fs.pathExists(filePath) && !args.force) {
			Log.stopSpinner();
			Log.update(`${LogSymbols.error} Uh oh. Looks like a file already exists. You can use the --force flag to over write it.`);
			return;
		}

		const fileName = path.parse(filePath).name;

		const sourceFile = project.createSourceFile(
			filePath, this.factory({...args, _fileName : fileName}), {overwrite : args.force, scriptKind : ScriptKind.TS}
		);

		sourceFile.formatText(StubFactory.formatSettings());
		sourceFile.fixMissingImports(StubFactory.formatSettings(), StubFactory.formatPreferences());
		await sourceFile.save();
		await sourceFile.refreshFromFileSystem();

		Log.stopSpinner();

		return sourceFile;
	}

	public static formatSettings() {
		return {
			indentSize                                       : 4,
			insertSpaceAfterCommaDelimiter                   : true,
			insertSpaceAfterTypeAssertion                    : true,
			insertSpaceBeforeTypeAnnotation                  : true,
			indentMultiLineObjectLiteralBeginningOnBlankLine : false,
		};
	}

	private async createDirectoryIfNotExisting(filePath: string) {
		const info = path.parse(filePath);

		await fs.ensureDir(info.dir);
	}

	public static formatPreferences(): UserPreferences {
		return {
			importModuleSpecifierPreference     : "relative",
			importModuleSpecifierEnding         : "minimal",
			allowTextChangesInNewFiles          : true,
			providePrefixAndSuffixTextForRename : true,
			includePackageJsonAutoImports       : "on",
		};
	}
}
