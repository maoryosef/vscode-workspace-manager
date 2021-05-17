import { getWorkspaceFolder } from "../utils/workspace";
import { InfoProvider, InfoProviderCreator } from "./types";

export async function factory(providerName: string): Promise<InfoProvider> {
    const provider = await import(`./${providerName}`) as InfoProviderCreator;
    
    if (provider) {
        const workspaceRoot = getWorkspaceFolder();
        
        return provider.create(workspaceRoot!);
    }
    
    throw new Error(`No such provider ${providerName}`);
}