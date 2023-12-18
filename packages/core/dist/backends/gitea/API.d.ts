import type { DataFile, PersistOptions } from '@staticcms/core/interface';
import type { ApiRequest, FetchError } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
import type { Semaphore } from 'semaphore';
import type { FilesResponse, GiteaUser } from './types';
export declare const API_NAME = "Gitea";
export interface Config {
    apiRoot?: string;
    token?: string;
    branch?: string;
    repo?: string;
    originRepo?: string;
}
declare enum FileOperation {
    CREATE = "create",
    DELETE = "delete",
    UPDATE = "update"
}
export interface ChangeFileOperation {
    content?: string;
    from_path?: string;
    path: string;
    operation: FileOperation;
    sha?: string;
}
interface MetaDataObjects {
    entry: {
        path: string;
        sha: string;
    };
    files: MediaFile[];
}
export interface Metadata {
    type: string;
    objects: MetaDataObjects;
    branch: string;
    status: string;
    collection: string;
    commitMessage: string;
    version?: string;
    user: string;
    title?: string;
    description?: string;
    timeStamp: string;
}
export interface BlobArgs {
    sha: string;
    repoURL: string;
    parseText: boolean;
}
type Param = string | number | undefined;
export type Options = RequestInit & {
    params?: Record<string, Param | Record<string, Param> | string[]>;
};
type MediaFile = {
    sha: string;
    path: string;
};
export default class API {
    apiRoot: string;
    token: string;
    branch: string;
    repo: string;
    originRepo: string;
    repoOwner: string;
    repoName: string;
    originRepoOwner: string;
    originRepoName: string;
    repoURL: string;
    originRepoURL: string;
    _userPromise?: Promise<GiteaUser>;
    _metadataSemaphore?: Semaphore;
    commitAuthor?: {};
    constructor(config: Config);
    static DEFAULT_COMMIT_MESSAGE: string;
    user(): Promise<{
        full_name: string;
        login: string;
        avatar_url: string;
    }>;
    getUser(): Promise<GiteaUser>;
    hasWriteAccess(): Promise<boolean>;
    reset(): void;
    requestHeaders(headers?: {}): Promise<Record<string, string>>;
    parseJsonResponse(response: Response): Promise<any>;
    urlFor(path: string, options: Options): string;
    parseResponse(response: Response): Promise<any>;
    handleRequestError(error: FetchError, responseStatus: number): void;
    buildRequest(req: ApiRequest): ApiRequest;
    request(path: string, options?: Options, parser?: (response: Response) => Promise<any>): Promise<any>;
    nextUrlProcessor(): (url: string) => string;
    requestAllPages<T>(url: string, options?: Options): Promise<T[]>;
    generateContentKey(collectionName: string, slug: string): string;
    parseContentKey(contentKey: string): {
        collection: string;
        slug: string;
    };
    readFile(path: string, sha?: string | null, { branch, repoURL, parseText, }?: {
        branch?: string;
        repoURL?: string;
        parseText?: boolean;
    }): Promise<string | Blob>;
    readFileMetadata(path: string, sha: string | null | undefined): Promise<import("@staticcms/core/interface").FileMetadata>;
    fetchBlobContent({ sha, repoURL, parseText }: BlobArgs): Promise<string | Blob>;
    listFiles(path: string, { repoURL, branch, depth }?: {
        repoURL?: string | undefined;
        branch?: string | undefined;
        depth?: number | undefined;
    }, folderSupport?: boolean): Promise<{
        type: string;
        id: string;
        name: string;
        path: string;
        size: number;
    }[]>;
    persistFiles(dataFiles: DataFile[], mediaFiles: AssetProxy[], options: PersistOptions): Promise<FilesResponse>;
    changeFiles(operations: ChangeFileOperation[], options: PersistOptions): Promise<FilesResponse>;
    getChangeFileOperations(files: {
        path: string;
        newPath?: string;
    }[], branch: string): Promise<ChangeFileOperation[]>;
    getFileSha(path: string, { repoURL, branch }?: {
        repoURL?: string | undefined;
        branch?: string | undefined;
    }): Promise<string>;
    deleteFiles(paths: string[], message: string): Promise<FilesResponse>;
    toBase64(str: string): Promise<string>;
}
export {};
