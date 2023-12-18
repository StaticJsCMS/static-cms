import { Cursor } from '@staticcms/core/lib/util';
import type { DataFile, PersistOptions } from '@staticcms/core/interface';
import type { ApiRequest } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
export declare const API_NAME = "GitLab";
export interface Config {
    apiRoot?: string;
    token?: string;
    branch?: string;
    repo?: string;
}
export interface CommitAuthor {
    name: string;
    email: string;
}
declare enum CommitAction {
    CREATE = "create",
    DELETE = "delete",
    MOVE = "move",
    UPDATE = "update"
}
type CommitItem = {
    base64Content?: string;
    path: string;
    oldPath?: string;
    action: CommitAction;
};
type FileEntry = {
    id: string;
    type: string;
    path: string;
    name: string;
};
type GitLabBranch = {
    name: string;
    developers_can_push: boolean;
    developers_can_merge: boolean;
    commit: {
        id: string;
    };
};
export declare function getMaxAccess(groups: {
    group_access_level: number;
}[]): {
    group_access_level: number;
};
export default class API {
    apiRoot: string;
    token: string | boolean;
    branch: string;
    repo: string;
    repoURL: string;
    commitAuthor?: CommitAuthor;
    constructor(config: Config);
    withAuthorizationHeaders: (req: ApiRequest) => Promise<import("../../lib/util/API").ApiRequestObject>;
    buildRequest: (req: ApiRequest) => Promise<import("../../lib/util/API").ApiRequestObject>;
    request: (req: ApiRequest) => Promise<Response>;
    responseToJSON: (res: Response) => Promise<any>;
    responseToBlob: (res: Response) => Promise<Blob>;
    responseToText: (res: Response) => Promise<string>;
    requestJSON: (req: ApiRequest) => Promise<any>;
    requestText: (req: ApiRequest) => Promise<string>;
    user: () => Promise<any>;
    WRITE_ACCESS: number;
    MAINTAINER_ACCESS: number;
    hasWriteAccess: () => Promise<boolean>;
    readFile: (path: string, sha?: string | null, { parseText, branch }?: {
        parseText?: boolean | undefined;
        branch?: string | undefined;
    }) => Promise<string | Blob>;
    readFileMetadata(path: string, sha: string | null | undefined): Promise<import("@staticcms/core/interface").FileMetadata>;
    getCursorFromHeaders: (headers: Headers) => Cursor;
    getCursor: ({ headers }: {
        headers: Headers;
    }) => Cursor;
    fetchCursor: (req: ApiRequest) => Promise<Cursor>;
    fetchCursorAndEntries: (req: ApiRequest) => Promise<{
        entries: FileEntry[];
        cursor: Cursor;
    }>;
    listFiles: (path: string, recursive?: boolean) => Promise<{
        files: FileEntry[];
        cursor: Cursor;
    }>;
    traverseCursor: (cursor: Cursor, action: string) => Promise<{
        entries: FileEntry[];
        cursor: Cursor;
    }>;
    listAllFiles: (path: string, folderSupport?: boolean, recursive?: boolean, branch?: string) => Promise<FileEntry[]>;
    toBase64: (str: string) => Promise<string>;
    fromBase64: (str: string) => string;
    getBranch(branchName: string): Promise<GitLabBranch>;
    uploadAndCommit(items: CommitItem[], { commitMessage, branch, newBranch }: {
        commitMessage?: string | undefined;
        branch?: string | undefined;
        newBranch?: boolean | undefined;
    }): Promise<any>;
    getCommitItems(files: {
        path: string;
        newPath?: string;
    }[], branch: string): Promise<CommitItem[]>;
    persistFiles(dataFiles: DataFile[], mediaFiles: AssetProxy[], options: PersistOptions): Promise<any>;
    deleteFiles: (paths: string[], commitMessage: string) => Promise<any>;
    getFileId(path: string, branch: string): Promise<string>;
    isFileExists(path: string, branch: string): Promise<boolean>;
    getDifferences(to: string, from?: string): Promise<{
        status: string;
        oldPath: string;
        newPath: string;
        newFile: boolean;
        path: string;
        binary: boolean;
    }[]>;
    getDefaultBranch(): Promise<GitLabBranch>;
    isShaExistsInBranch(branch: string, sha: string): Promise<boolean>;
}
export {};
