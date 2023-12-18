import { Cursor } from '@staticcms/core/lib/util';
import type { DataFile, PersistOptions } from '@staticcms/core/interface';
import type { ApiRequest } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
interface Config {
    apiRoot?: string;
    token?: string;
    branch?: string;
    repo?: string;
    requestFunction?: (req: ApiRequest) => Promise<Response>;
    hasWriteAccess?: () => Promise<boolean>;
}
interface CommitAuthor {
    name: string;
    email: string;
}
type BitBucketFile = {
    id: string;
    type: string;
    path: string;
    commit?: {
        hash: string;
    };
};
type BitBucketSrcResult = {
    size: number;
    page: number;
    pagelen: number;
    next: string;
    previous: string;
    values: BitBucketFile[];
};
type BitBucketUser = {
    username: string;
    display_name: string;
    nickname: string;
    links: {
        avatar: {
            href: string;
        };
    };
};
type BitBucketBranch = {
    name: string;
    target: {
        hash: string;
    };
};
export declare const API_NAME = "Bitbucket";
export default class API {
    apiRoot: string;
    branch: string;
    repo: string;
    requestFunction: (req: ApiRequest) => Promise<Response>;
    repoURL: string;
    commitAuthor?: CommitAuthor;
    constructor(config: Config);
    buildRequest: (req: ApiRequest) => import("../../lib/util/API").ApiRequestObject;
    request: (req: ApiRequest) => Promise<Response>;
    responseToJSON: (res: Response) => Promise<any>;
    responseToBlob: (res: Response) => Promise<Blob>;
    responseToText: (res: Response) => Promise<string>;
    requestJSON: (req: ApiRequest) => Promise<any>;
    requestText: (req: ApiRequest) => Promise<string>;
    user: () => Promise<BitBucketUser>;
    hasWriteAccess: () => Promise<boolean>;
    getBranch: (branchName: string) => Promise<BitBucketBranch>;
    branchCommitSha: (branch: string) => Promise<string>;
    defaultBranchCommitSha: () => Promise<string>;
    isFile: ({ type }: BitBucketFile) => boolean;
    getFileId: (commitHash: string, path: string) => string;
    processFile: (file: BitBucketFile) => {
        id: string;
        type: string;
        path: string;
        name: string;
    };
    processFiles: (files: BitBucketFile[], folderSupport?: boolean) => {
        id: string;
        type: string;
        path: string;
        name: string;
    }[];
    readFile: (path: string, sha?: string | null, { parseText, branch, head }?: {
        parseText?: boolean | undefined;
        branch?: string | undefined;
        head?: string | undefined;
    }) => Promise<string | Blob>;
    readFileMetadata(path: string, sha: string | null | undefined): Promise<import("@staticcms/core/interface").FileMetadata>;
    isShaExistsInBranch(branch: string, sha: string): Promise<boolean>;
    getEntriesAndCursor: (jsonResponse: BitBucketSrcResult) => {
        entries: BitBucketFile[];
        cursor: Cursor;
    };
    listFiles: (path: string, depth: number | undefined, pagelen: number, branch: string) => Promise<{
        entries: {
            id: string;
            type: string;
            path: string;
            name: string;
        }[];
        cursor: Cursor;
    }>;
    traverseCursor: (cursor: Cursor, action: string) => Promise<{
        cursor: Cursor;
        entries: {
            path: string;
            name: string;
            type: string;
            id: string;
        }[];
    }>;
    listAllFiles: (path: string, depth: number, branch: string, folderSupport?: boolean) => Promise<{
        id: string;
        type: string;
        path: string;
        name: string;
    }[]>;
    uploadFiles(files: {
        path: string;
        newPath?: string;
        delete?: boolean;
    }[], { commitMessage, branch, parentSha, }: {
        commitMessage: string;
        branch: string;
        parentSha?: string;
    }): Promise<{
        path: string;
        newPath?: string | undefined;
        delete?: boolean | undefined;
    }[]>;
    persistFiles(dataFiles: DataFile[], mediaFiles: ({
        fileObj: File;
        size: number;
        sha: string;
        raw: string;
        path: string;
    } | AssetProxy)[], options: PersistOptions): Promise<{
        path: string;
        newPath?: string | undefined;
        delete?: boolean | undefined;
    }[]>;
    getDifferences(source: string, destination?: string): Promise<{
        oldPath: string;
        newPath: string;
        status: string;
        newFile: boolean;
        path: string;
        binary: boolean;
    }[]>;
    deleteFiles: (paths: string[], message: string) => Promise<Response>;
}
export {};
