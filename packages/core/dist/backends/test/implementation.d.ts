import { Cursor } from '@staticcms/core/lib/util';
import type { BackendClass, BackendEntry, Config, DisplayURL, ImplementationEntry, ImplementationFile, ImplementationMediaFile, User } from '@staticcms/core/interface';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
type RepoFile = {
    path: string;
    content: string | AssetProxy;
    isDirectory?: boolean;
};
type RepoTree = {
    [key: string]: RepoFile | RepoTree;
};
declare global {
    interface Window {
        repoFiles: RepoTree;
    }
}
export declare function getFolderFiles(tree: RepoTree, folder: string, extension: string, depth: number, files?: RepoFile[], path?: string, includeFolders?: boolean): RepoFile[];
export default class TestBackend implements BackendClass {
    mediaFolder?: string;
    options: {};
    constructor(config: Config, options?: {});
    isGitBackend(): boolean;
    status(): Promise<{
        auth: {
            status: boolean;
        };
        api: {
            status: boolean;
            statusPage: string;
        };
    }>;
    authComponent(): ({ inProgress, config, onLogin, }: import("@staticcms/core/interface").TranslatedProps<import("@staticcms/core/interface").AuthenticationPageProps>) => JSX.Element;
    restoreUser(): Promise<User>;
    authenticate(): Promise<User>;
    logout(): null;
    getToken(): Promise<string>;
    traverseCursor(cursor: Cursor, action: string): Promise<{
        entries: {
            data: string;
            file: {
                path: string;
                id: string;
            };
        }[];
        cursor: Cursor;
    }>;
    entriesByFolder(folder: string, extension: string, depth: number): Promise<{
        data: string;
        file: {
            path: string;
            id: string;
        };
    }[]>;
    entriesByFiles(files: ImplementationFile[]): Promise<{
        file: ImplementationFile;
        data: string;
    }[]>;
    getEntry(path: string): Promise<{
        file: {
            path: string;
            id: null;
        };
        data: string;
    }>;
    persistEntry(entry: BackendEntry): Promise<void>;
    getMedia(mediaFolder?: string | undefined, folderSupport?: boolean): Promise<ImplementationMediaFile[]>;
    getMediaFile(path: string): Promise<{
        id: string;
        displayURL: string;
        path: string;
        name: string;
        size: number;
        url: string;
    }>;
    normalizeAsset(assetProxy: AssetProxy): ImplementationMediaFile;
    persistMedia(assetProxy: AssetProxy): Promise<ImplementationMediaFile>;
    deleteFiles(paths: string[]): Promise<void>;
    allEntriesByFolder(folder: string, extension: string, depth: number): Promise<ImplementationEntry[]>;
    getMediaDisplayURL(_displayURL: DisplayURL): Promise<string>;
}
export {};
