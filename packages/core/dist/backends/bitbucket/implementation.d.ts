import { NetlifyAuthenticator } from '@staticcms/core/lib/auth';
import API from './API';
import GitLfsClient from './git-lfs-client';
import type { Semaphore } from 'semaphore';
import type { BackendEntry, BackendClass, Config, Credentials, DisplayURL, ImplementationFile, PersistOptions, User } from '@staticcms/core/interface';
import type { ApiRequest, AsyncLock, Cursor } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
export default class BitbucketBackend implements BackendClass {
    lock: AsyncLock;
    api: API | null;
    updateUserCredentials: (args: {
        token: string;
        refresh_token: string;
    }) => Promise<null>;
    options: {
        proxied: boolean;
        API: API | null;
        updateUserCredentials: (args: {
            token: string;
            refresh_token: string;
        }) => Promise<null>;
    };
    repo: string;
    branch: string;
    apiRoot: string;
    baseUrl: string;
    siteId: string;
    token: string | null;
    mediaFolder?: string;
    refreshToken?: string;
    refreshedTokenPromise?: Promise<string>;
    authenticator?: NetlifyAuthenticator;
    _mediaDisplayURLSem?: Semaphore;
    largeMediaURL: string;
    _largeMediaClientPromise?: Promise<GitLfsClient>;
    authType: string;
    constructor(config: Config, options?: {});
    isGitBackend(): boolean;
    status(): Promise<{
        auth: {
            status: boolean;
        };
        api: {
            status: any;
            statusPage: string;
        };
    }>;
    authComponent(): ({ inProgress, config, base_url, siteId, authEndpoint, clearHash, onLogin, t, }: import("@staticcms/core/interface").TranslatedProps<import("@staticcms/core/interface").AuthenticationPageProps>) => JSX.Element;
    requestFunction: (req: ApiRequest) => Promise<Response>;
    restoreUser(user: User): Promise<{
        name: string;
        login: string;
        token: string | {};
        avatar_url: string;
        refresh_token: string | undefined;
        username: string;
        display_name: string;
        nickname: string;
        links: {
            avatar: {
                href: string;
            };
        };
    }>;
    authenticate(state: Credentials): Promise<{
        name: string;
        login: string;
        token: string | {};
        avatar_url: string;
        refresh_token: string | undefined;
        username: string;
        display_name: string;
        nickname: string;
        links: {
            avatar: {
                href: string;
            };
        };
    }>;
    getRefreshedAccessToken(): Promise<string> | undefined;
    logout(): void;
    getToken(): Promise<string | null>;
    apiRequestFunction: (req: ApiRequest) => Promise<Response>;
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
            path: string;
        };
        isDirectory: boolean;
    }[]>;
    getLargeMediaClient(): Promise<GitLfsClient>;
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
    persistMedia(mediaFile: {
        fileObj: File;
        size: number;
        sha: string;
        raw: string;
        path: string;
    } | AssetProxy, options: PersistOptions): Promise<{
        displayURL: string;
        path: string;
        name: string;
        size: number;
        id: string;
        file: File;
        url: string;
    }>;
    _persistMedia(mediaFile: {
        fileObj: File;
        size: number;
        sha: string;
        raw: string;
        path: string;
    } | AssetProxy, options: PersistOptions): Promise<{
        displayURL: string;
        path: string;
        name: string;
        size: number;
        id: string;
        file: File;
        url: string;
    }>;
    deleteFiles(paths: string[], commitMessage: string): Promise<Response>;
    traverseCursor(cursor: Cursor, action: string): Promise<{
        entries: import("@staticcms/core/interface").ImplementationEntry[];
        cursor: Cursor;
    }>;
    loadMediaFile(path: string, id: string, { branch }: {
        branch: string;
    }): Promise<{
        id: string;
        displayURL: string;
        path: string;
        name: string;
        size: number;
        file: File;
    }>;
}
