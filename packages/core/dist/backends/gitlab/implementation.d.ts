import API from './API';
import type { Semaphore } from 'semaphore';
import type { AsyncLock, Cursor } from '@staticcms/core/lib/util';
import type { Config, Credentials, DisplayURL, BackendEntry, BackendClass, ImplementationFile, PersistOptions, User } from '@staticcms/core/interface';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
export default class GitLab implements BackendClass {
    lock: AsyncLock;
    api: API | null;
    options: {
        proxied: boolean;
        API: API | null;
    };
    repo: string;
    branch: string;
    apiRoot: string;
    token: string | null;
    mediaFolder?: string;
    _mediaDisplayURLSem?: Semaphore;
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
    authComponent(): ({ inProgress, config, siteId, authEndpoint, clearHash, onLogin, t, }: import("@staticcms/core/interface").TranslatedProps<import("@staticcms/core/interface").AuthenticationPageProps>) => JSX.Element;
    restoreUser(user: User): Promise<any>;
    authenticate(state: Credentials): Promise<any>;
    logout(): Promise<void>;
    getToken(): Promise<string | null>;
    filterFile(folder: string, file: {
        path: string;
        name: string;
    }, extension: string, depth: number): boolean;
    entriesByFolder(folder: string, extension: string, depth: number): Promise<import("@staticcms/core/interface").ImplementationEntry[]>;
    listAllFiles(folder: string, extension: string, depth: number): Promise<{
        id: string;
        type: string;
        path: string;
        name: string;
    }[]>;
    allEntriesByFolder(folder: string, extension: string, depth: number): Promise<import("@staticcms/core/interface").ImplementationEntry[]>;
    entriesByFiles(files: ImplementationFile[]): Promise<import("@staticcms/core/interface").ImplementationEntry[]>;
    getEntry(path: string): Promise<{
        file: {
            path: string;
            id: null;
        };
        data: string;
    }>;
    getMedia(mediaFolder?: string | undefined, folderSupport?: boolean): Promise<{
        id: string;
        name: string;
        path: string;
        displayURL: {
            id: string;
            name: string;
            path: string;
        };
        isDirectory: boolean;
    }[]>;
    getMediaDisplayURL(displayURL: DisplayURL): Promise<string>;
    getMediaFile(path: string): Promise<{
        id: string;
        displayURL: string;
        path: string;
        name: string;
        size: number;
        file: File;
        url: string;
    }>;
    persistEntry(entry: BackendEntry, options: PersistOptions): Promise<any>;
    persistMedia(mediaFile: AssetProxy, options: PersistOptions): Promise<{
        displayURL: string;
        path: string;
        name: string;
        size: number;
        file: File;
        url: string;
        id: string;
    }>;
    deleteFiles(paths: string[], commitMessage: string): Promise<any>;
    traverseCursor(cursor: Cursor, action: string): Promise<{
        entries: import("@staticcms/core/interface").ImplementationEntry[];
        cursor: Cursor;
    }>;
}
