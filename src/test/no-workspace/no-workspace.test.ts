import * as assert from 'assert';

import * as vscode from 'vscode';
import { loadFixture } from '../fixtureLoader';

const FIXTURE = 'no-workspace';

suite('no workspace repo', () => {
	test('should return undefined', async () => {
		await loadFixture(FIXTURE, 'index.ts');
		const noPackage = await vscode.commands.executeCommand('workspace-manager.getFilePackage');
		assert.strictEqual(noPackage, undefined);
	});
});
