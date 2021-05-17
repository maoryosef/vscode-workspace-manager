interface WorkspaceInfoItem {
	location: string;
    workspaceDependencies: string[];
}

export type WorkspaceInfo = Record<string, WorkspaceInfoItem>;

export interface InfoProvider {
    getInfo: () => Promise<WorkspaceInfo | undefined> | WorkspaceInfo | undefined
}

export interface InfoProviderCreator {
    create: (workspaceRoot: string) => InfoProvider;
}