import * as vscode from 'vscode';
import { getFullPath } from './utils/workspace';
import { factory } from './providers';
import { InfoProvider } from './providers/types';

async function findWorkspace(infoProvider: InfoProvider, file: string) {
	try {
		const info = await infoProvider.getInfo();
	
		if (info) {
			return Object.values(info).find(ws =>
				file.startsWith(getFullPath(ws.location))
			);
		}
	} catch (e) {
		console.error('Failed getting workspace', e);
		vscode.window.showErrorMessage('Failed getting workspace', e);
	}
}

export async function activate(context: vscode.ExtensionContext) {
	const infoProvider = await factory('yarn');
	
	let disposable = vscode.commands.registerCommand('workspace-manager.getFilePackage', async () => {
		const currentFile = vscode.window.activeTextEditor?.document.fileName;
		const workspace = await findWorkspace(infoProvider, currentFile!);

		if (workspace) {
			return getFullPath(workspace.location);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
