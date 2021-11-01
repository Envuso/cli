import * as path from "path";
import {StubFactory} from "../StubFactory";

export class SocketChannelListenerStubFactory extends StubFactory {

	public static factoryOutputName() {
		return 'Socket Channel';
	}

	public factory(args: { [key: string]: any }) {
		return `
import {injectable} from "@envuso/core/AppContainer";
import {Middleware} from "@envuso/core/Routing";
import {SocketChannelListener} from "@envuso/core/Sockets/SocketChannelListener";
import {SocketConnection} from "@envuso/core/Sockets/SocketConnection";
import {SocketPacket} from "@envuso/core/Sockets/SocketPacket";

@injectable()
export class {{name}} extends SocketChannelListener {

	public channelName(): string {
		return "";
	}

	public async isAuthorised(connection: SocketConnection, user: any): Promise<boolean> {
		return true;
	}

	public middlewares(): Middleware[] {
		return [];
	}

	async helloWorld(connection: SocketConnection, user: User, packet: SocketPacket): Promise<any> {		
		// This will handle the "helloWorld" event
	}
}
`
			.replaceAll('{{name}}', args._fileName)
	}

	public normalizeFilePath(filePath: string) {
		const info = path.parse(filePath);
		if (!info.name.endsWith('SocketChannel')) {
			info.name += 'SocketChannel';
			info.base += 'SocketChannel';
		}
		return path.normalize(
			path.join('.', 'src', 'App', 'Http', 'Sockets', path.format(info))
		);
	}
}
