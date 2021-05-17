import * as vscode from 'vscode';
import { resolve } from 'path';

export const getWorkspaceFolder = () =>
    vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor?.document.uri!)?.uri.path;

export const getFullPath = (path: string) => resolve(getWorkspaceFolder()!, path);
