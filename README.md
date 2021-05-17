# workspace-manager

Add commands to manage your workspace

### Commands

`workspace-manager.getFilePackage` returns the package base path of the current opened file

For example:

for the following structure, 
```
|-- packages
|   |-- package-a
|   |   |-- index.ts
|   |   |-- package.json
|   |-- package-b
|   |   |-- index.ts
|   |   |-- package.json
|-- package.json
```

when the active editor is on `packages/package-a/index.ts`, the result of `getFilePackage` will be `<workspaceRoot>/packages/package-a`

This command is useful for adding lunch scripts that needs to run on the package base path
