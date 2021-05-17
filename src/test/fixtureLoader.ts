import * as vscode from 'vscode';
import { resolve } from 'path';

const FIXTURES_BASE = resolve(__dirname, '..', '..', 'test-fixtures');

export function loadFixture(fixtureName: string, fixturePath: string) {
    const fileUri = vscode.Uri.file(`${FIXTURES_BASE}/${fixtureName}/${fixturePath}`);

    return vscode.window.showTextDocument(fileUri);
}

export const getFixtureBase = (fixtureName: string) =>
    resolve(FIXTURES_BASE, fixtureName);