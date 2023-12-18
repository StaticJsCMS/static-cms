import type { DataFile, PersistOptions } from '@staticcms/core/interface';
import type { ApiRequest, FetchError } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
import type { Semaphore } from 'semaphore';
import type { GitCreateCommitResponse, GitCreateRefResponse, GitCreateTreeParamsTree, GitCreateTreeResponse, GitHubAuthor, GitHubCommitter, GitHubUser, GitUpdateRefResponse, ReposGetBranchResponse } from './types';
export declare const API_NAME = "GitHub";
export interface Config {
    apiRoot?: string;
    token?: string;
    branch?: string;
    repo?: string;
    originRepo?: string;
}
type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type TreeEntry = Override<GitCreateTreeParamsTree, {
    sha: string | null;
}>;
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
export type Diff = {
    path: string;
    newFile: boolean;
    sha: string;
    binary: boolean;
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
    _userPromise?: Promise<GitHubUser>;
    _metadataSemaphore?: Semaphore;
    commitAuthor?: {};
    constructor(config: Config);
    static DEFAULT_COMMIT_MESSAGE: string;
    user(): Promise<{
        name: string;
        login: string;
    }>;
    getUser(): Promise<GitHubUser>;
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
    persistFiles(dataFiles: DataFile[], mediaFiles: AssetProxy[], options: PersistOptions): Promise<GitUpdateRefResponse>;
    getFileSha(path: string, { repoURL, branch }?: {
        repoURL?: string | undefined;
        branch?: string | undefined;
    }): Promise<string>;
    deleteFiles(paths: string[], message: string): Promise<void>;
    createRef(type: string, name: string, sha: string): Promise<GitCreateRefResponse>;
    patchRef(type: string, name: string, sha: string): Promise<GitUpdateRefResponse>;
    deleteRef(type: string, name: string): Promise<any>;
    getDefaultBranch(): Promise<ReposGetBranchResponse>;
    patchBranch(branchName: string, sha: string): Promise<GitUpdateRefResponse>;
    getHeadReference(head: string): Promise<string>;
    toBase64(str: string): Promise<string>;
    uploadBlob(item: {
        raw?: string;
        sha?: string;
        toBase64?: () => Promise<string>;
    }): Promise<{
        raw?: string | undefined;
        sha?: string | undefined;
        toBase64?: (() => Promise<string>) | undefined;
    }>;
    updateTree(baseSha: string, files: {
        path: string;
        sha: string | null;
        newPath?: string;
    }[], branch?: string): Promise<{
        parentSha: string;
        sha: string;
        tree: {
            mode: string;
            path: string;
            sha: string;
            size: number;
            type: string;
            url: string;
        }[];
        url: string;
    }>;
    createTree(baseSha: string, tree: TreeEntry[]): Promise<GitCreateTreeResponse>;
    commit(message: string, changeTree: {
        parentSha?: string;
        sha: string;
    }): Promise<GitCreateCommitResponse>;
    createCommit(message: string, treeSha: string, parents: string[], author?: GitHubAuthor, committer?: GitHubCommitter): Promise<GitCreateCommitResponse>;
}
export {};
