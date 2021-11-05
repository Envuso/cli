import {ConfigMetaGenerator, ControllerMetaGenerator, GenerateTypesFile, getProject, ModuleMetaGenerator, Program} from "@envuso/compiler";
import {SyntaxKind} from "@ts-morph/common";
import chalk from "chalk";
import {ArrayLiteralExpression, IndentationText, Project, SourceFile} from "ts-morph";
import {EnvusoProject} from "./EnvusoProject";
import {StubFactory} from "./StubFactories/StubFactory";
import {Log} from "./Utility/Log";
import {LogSymbols} from "./Utility/LogSymbols";

export type ClassesLoaded = {
	controller: SourceFile[];
	model: SourceFile[];
	socketChannelListener: SourceFile[];
	middleware: SourceFile[];
	config: SourceFile[];
	policies: SourceFile[];
}

export class TsCompiler {
	private static project: Project = null;

	private static classesLoaded: ClassesLoaded = {
		controller            : [],
		model                 : [],
		socketChannelListener : [],
		middleware            : [],
		config                : [],
		policies              : [],
	};

	private static applicationServiceProviders: string[]                    = null;
	private static applicationServiceProvidersArray: ArrayLiteralExpression = null;

	public static setup(): TsCompiler {

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

		this.classesLoaded.model                 = this.project.addSourceFilesAtPaths('src/App/Models/**/*');
		this.classesLoaded.controller            = this.project.addSourceFilesAtPaths('src/App/Http/Controllers/**/*');
		this.classesLoaded.socketChannelListener = this.project.addSourceFilesAtPaths('src/App/Http/Sockets/**/*');
		this.classesLoaded.middleware            = this.project.addSourceFilesAtPaths('src/App/Http/Middleware/**/*');
		this.classesLoaded.policies              = this.project.addSourceFilesAtPaths('src/Policies/**/*');
		this.classesLoaded.config                = this.project.addSourceFilesAtPaths('src/Config/**/*');

		return this;
	}

	public static getModels(): SourceFile[] {
		return this.classesLoaded.model;
	}

	public static getControllers(): SourceFile[] {
		return this.classesLoaded.controller;
	}

	public static getConfigSource(file: string): SourceFile {
		return this.classesLoaded.config.find(f => f.getBaseNameWithoutExtension() === file);
	}

	public static hasModel(name: string): boolean {
		return this.classesLoaded.model
			.filter(file => file.getClasses().length > 0)
			.some(file => file.getClasses().some(c => c.getName() === name));
	}

	public static getApplicationServiceProviders(): string[] {
		if (this.applicationServiceProviders === null) {
			const appConfigSource = TsCompiler.getConfigSource('AppConfiguration');
			const appConfigClass  = appConfigSource.getClasses()[0];

			this.applicationServiceProvidersArray = appConfigClass.getMember('providers')
				.asKind(SyntaxKind.PropertyDeclaration)
				.getInitializer()
				.asKind(SyntaxKind.ArrayLiteralExpression);

			this.applicationServiceProviders = this.applicationServiceProvidersArray.getElements().map(p => {
				return p.getText();
			});
		}

		return this.applicationServiceProviders;
	}

	public static hasServiceProvider(provider: string) {
		return this.getApplicationServiceProviders().includes(provider);
	}

	public static getServiceProvidersArray(): ArrayLiteralExpression {
		return this.applicationServiceProvidersArray;
	}

	public static async generateStub(factory: new () => StubFactory, filePath: string, args: { [key: string]: any }) {
		const stubFactory = new factory();

		Log.startSpinner(`Generating...`);

		const file = await stubFactory.generate(this.project, filePath, args);

		//@ts-ignore
		Log.update(`${LogSymbols.success} Your ${factory.factoryOutputName()} was generated at: ${chalk.bold.yellow(file.getFilePath())}`);


		return file;
	}

	public static async buildProject(watch: boolean = false, simpleBuild: boolean = false) {
		await this.setup();

		if (!EnvusoProject.isEnvusoDirectory()) {
			console.log(`${LogSymbols.error} You must be in the root of your Envuso project to build.`);
			return;
		}

		await Program.loadConfiguration();

		if (!simpleBuild) {
			await Program.setup([
				GenerateTypesFile,
				ConfigMetaGenerator,
				ControllerMetaGenerator,
				ModuleMetaGenerator,
			]);
			await Program.run(watch);

			return;
		}

		await Program.setup([]);
		await Program.build(watch);
	}

	public static async runTscCompiler() {
		await this.setup();

		if (!EnvusoProject.isEnvusoDirectory()) {
			console.log(`${LogSymbols.error} You must be in the root of your Envuso project to build.`);
			return;
		}

		const result = await getProject().emit({})

		for (const diagnostic of result.getDiagnostics()) {
			console.log(diagnostic.getMessageText());
		}

	}
}
