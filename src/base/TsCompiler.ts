import chalk from "chalk";
import {IndentationText, Project, SourceFile} from "ts-morph";
import {StubFactory} from "./StubFactories/StubFactory";
import {Log} from "./Utility/Log";
import {LogSymbols} from "./Utility/LogSymbols";

export enum SetupType {
	CONTROLLER = 'controller',
	MODEL      = 'model',
}

export class TsCompiler {
	private static project: Project = null;

	private static filesLoadedStatus = {
		controllers : false,
		models      : false,
	};

	private static models: SourceFile[]      = [];
	private static controllers: SourceFile[] = [];

	public static setup(type: SetupType): TsCompiler {

		this.project = new Project({
			skipAddingFilesFromTsConfig  : true,
			skipLoadingLibFiles          : true,
			skipFileDependencyResolution : true,
			manipulationSettings         : {
				indentationText                                       : IndentationText.FourSpaces,
				insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces : true,
				usePrefixAndSuffixTextForRename                       : true,
				useTrailingCommas                                     : true,
			}
		});

		TsCompiler.loadControllers();
		TsCompiler.loadModels();

		return this;
	}

	public static getModels(): SourceFile[] {
		return this.models;
	}

	public static loadModels(force: boolean = false) {
		if (!force && this.filesLoadedStatus.models) {
			return;
		}

		this.models = this.project.addSourceFilesAtPaths('src/App/Models/**/*');

		this.filesLoadedStatus.models = true;
	}

	public static hasModel(name: string): boolean {
		return this.models
			.filter(file => file.getClasses().length > 0)
			.some(file => file.getClasses().some(c => c.getName() === name));
	}

	public static loadControllers(force: boolean = false) {
		if (!force && this.filesLoadedStatus.controllers) {
			return;
		}

		this.controllers = this.project.addSourceFilesAtPaths('src/App/Http/Controllers/**/*');

		this.filesLoadedStatus.controllers = true;
	}

	public static getControllers(): SourceFile[] {
		return this.controllers;
	}

	public static hasController(name: string): boolean {
		return this.controllers
			.filter(file => file.getClasses().length > 0)
			.some(file => file.getClasses().some(c => c.getName() === name));
	}

	public static async generateStub(factory: new () => StubFactory, filePath: string, args: { [key: string]: any }) {
		const stubFactory = new factory();

		Log.startSpinner(`Generating...`);

		const file = await stubFactory.generate(this.project, filePath, args);

		//@ts-ignore
		Log.update(`${LogSymbols.success} Your ${factory.factoryOutputName()} was generated at: ${chalk.bold.yellow(file.getFilePath())}`);


		return file;
	}
}
