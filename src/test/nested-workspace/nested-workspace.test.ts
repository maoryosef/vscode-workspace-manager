import * as assert from 'assert';

import * as vscode from 'vscode';
import { getFixtureBase, loadFixture } from '../fixtureLoader';
import {resolve} from 'path';

const FIXTURE = 'nested-workspace';

suite('nested workspace repo', () => {
	const fixtureBase = getFixtureBase(FIXTURE);
	
	test('should return the correct package for file', async () => {
		await loadFixture(FIXTURE, 'packages/package-a/inner/inner/otherFile.ts');
		const packageA = await vscode.commands.executeCommand('workspace-manager.getFilePackage');
		assert.strictEqual(packageA, resolve(fixtureBase, 'packages', 'package-a'));
	});
});
