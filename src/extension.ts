import * as vscode from 'vscode';
import { getFullPath } from './utils/workspace';
import { factory } from './providers';
import { InfoProvider } from './providers/types';

async function findWorkspace(infoProvider: InfoProvider, file: string) {
	const info = await infoProvider.getInfo();

	if (info) {
		return Object.values(info).find(ws =>
			file.startsWith(getFullPath(ws.location))
		);
	}		
}

export async function activate(context: vscode.ExtensionContext) {
	const infoProvider = await factory('yarn');
	
	let disposable = vscode.commands.registerCommand('workspace-manager.getFilePackage', async () => {
		const currentFile = vscode.window.activeTextEditor?.document.fileName;
		const workspace = await findWorkspace(infoProvider, currentFile!);

		if (workspace) {
			vscode.window.showInformationMessage(getFullPath(workspace.location) + '456');
			return getFullPath(workspace.location);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
