import * as path from 'path';
import { readdirSync } from 'fs';

import { runTests } from 'vscode-test';

const getDirectories = () =>
  readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

async function main() {
	try {
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');
		const testSuites = getDirectories();

		for (const suite of testSuites) {
			const extensionTestsPath = path.resolve(__dirname, `./${suite}/index`);
			const testWorkspace = path.resolve(__dirname, `../../test-fixtures/${suite}`);
			
			await runTests({ extensionDevelopmentPath, extensionTestsPath, launchArgs: ['--disable-extensions', testWorkspace] });
		}
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
