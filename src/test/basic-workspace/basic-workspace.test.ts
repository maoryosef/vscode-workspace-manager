import * as assert from 'assert';

import * as vscode from 'vscode';
import { getFixtureBase, loadFixture } from '../fixtureLoader';
import {resolve} from 'path';

const FIXTURE = 'basic-workspace';

suite('Basic workspace repo', () => {
	const fixtureBase = getFixtureBase(FIXTURE);
	
	test('should return the correct package for file', async () => {
		await loadFixture(FIXTURE, 'packages/package-a/index.ts');
		const packageA = await vscode.commands.executeCommand('workspace-manager.getFilePackage');
		assert.strictEqual(packageA, resolve(fixtureBase, 'packages', 'package-a'));

		await loadFixture(FIXTURE, 'packages/package-b/index.ts');
		const packageB = await vscode.commands.executeCommand('workspace-manager.getFilePackage');
		assert.strictEqual(packageB, resolve(fixtureBase, 'packages', 'package-b'));
	});
	
	suite('when outside of package', () => {
		test('should return undefined', async () => {
			await loadFixture(FIXTURE, 'package.json');
			const noPackage = await vscode.commands.executeCommand('workspace-manager.getFilePackage');
			assert.strictEqual(noPackage, undefined);
		});
	});
});
