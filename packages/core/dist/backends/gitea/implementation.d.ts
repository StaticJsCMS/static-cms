import { Cursor } from '@staticcms/core/lib/util';
import API from './API';
import type { BackendClass, BackendEntry, Config, Credentials, DisplayURL, ImplementationFile, PersistOptions, User } from '@staticcms/core/interface';
import type { AsyncLock } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
import type { Semaphore } from 'semaphore';
import type { GiteaUser } from './types';
type ApiFile = {
    id: string;
    type: string;
    name: string;
    path: string;
    size: number;
};
export default class Gitea implements BackendClass {
    lock: AsyncLock;
    api: API | null;
    options: {
        proxied: boolean;
        API: API | null;
    };
    originRepo: string;
    repo?: string;
    branch: string;
    apiRoot: string;
    mediaFolder?: string;
    token: string | null;
    _currentUserPromise?: Promise<GiteaUser>;
    _userIsOriginMaintainerPromises?: {
        [key: string]: Promise<boolean>;
    };
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
    authComponent(): ({ inProgress, config, clearHash, onLogin, t, }: import("@staticcms/core/interface").TranslatedProps<import("@staticcms/core/interface").AuthenticationPageProps>) => JSX.Element;
    restoreUser(user: User): Promise<{
        name: string;
        login: string;
        avatar_url: string;
        token: string;
    }>;
    currentUser({ token }: {
        token: string;
    }): Promise<GiteaUser>;
    userIsOriginMaintainer({ username: usernameArg, token, }: {
        username?: string;
        token: string;
    }): Promise<boolean>;
    authenticate(state: Credentials): Promise<{
        name: string;
        login: string;
        avatar_url: string;
        token: string;
    }>;
    logout(): void;
    getToken(): Promise<string | null>;
    getCursorAndFiles: (files: ApiFile[], page: number) => {
        cursor: Cursor;
        files: ApiFile[];
    };
    entriesByFolder(folder: string, extension: string, depth: number): Promise<import("@staticcms/core/interface").ImplementationEntry[]>;
    allEntriesByFolder(folder: string, extension: string, depth: number): Promise<import("@staticcms/core/interface").ImplementationEntry[]>;
    entriesByFiles(files: ImplementationFile[]): Promise<import("@staticcms/core/interface").ImplementationEntry[]>;
    getEntry(path: string): Promise<{
        file: {
            path: string;
            id: null;
        };
        data: string;
    } | {
        file: {
            path: string;
            id: null;
        };
        data: string;
    }>;
    getMedia(mediaFolder?: string | undefined, folderSupport?: boolean): Promise<{
        id: string;
        name: string;
        size: number;
        displayURL: {
            id: string;
            path: string;
        };
        path: string;
        isDirectory: boolean;
    }[]>;
    getMediaFile(path: string): Promise<{
        id: string;
        displayURL: string;
        path: string;
        name: string;
        size: number;
        file: File;
        url: string;
    }>;
    getMediaDisplayURL(displayURL: DisplayURL): Promise<string>;
    persistEntry(entry: BackendEntry, options: PersistOptions): Promise<any>;
    persistMedia(mediaFile: AssetProxy, options: PersistOptions): Promise<{
        id: string;
        name: string;
        size: number;
        displayURL: string;
        path: string;
    }>;
    deleteFiles(paths: string[], commitMessage: string): Promise<import("./types").FilesResponse>;
    traverseCursor(cursor: Cursor, action: string): Promise<{
        entries: import("@staticcms/core/interface").ImplementationEntry[];
        cursor: Cursor;
    }>;
}
export {};
