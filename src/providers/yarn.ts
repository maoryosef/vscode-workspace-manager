import { exec } from 'child_process';
import { InfoProvider, WorkspaceInfo } from './types';

export function create(workspaceRoot: string): InfoProvider {
    async function getInfo(): Promise<WorkspaceInfo> {
        const infoRaw = await new Promise<string>((res, rej) => exec('yarn workspaces info', 
            {encoding: 'utf-8', cwd: workspaceRoot},
            (err, out) => {
                if (err) {
                    rej(err);
                    return;
                }
                
                res(out);
            }
        ));
    
        const lines = infoRaw.trim().split('\n');
        
        //To remove the "Yarn workspaces x.x.x" Header
        while (!lines[0].startsWith('{')) {
            lines.shift();
        }
        
        //To remove the "Done in x.xx" Footer
        while (!lines[lines.length - 1].endsWith('}')) {
            lines.pop();
        }
        
        return JSON.parse(lines.join(''));
    }
    
    return {
        getInfo
    };
}
