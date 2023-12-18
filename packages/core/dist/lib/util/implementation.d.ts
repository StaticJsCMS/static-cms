import type { Semaphore } from 'semaphore';
import type { DisplayURL, FileMetadata, ImplementationEntry, ImplementationFile } from '@staticcms/core/interface';
import type { AsyncLock } from './asyncLock';
type ReadFile = (path: string, id: string | null | undefined, options: {
    parseText: boolean;
}) => Promise<string | Blob>;
type ReadFileMetadata = (path: string, id: string | null | undefined) => Promise<FileMetadata>;
type CustomFetchFunc = (files: ImplementationFile[]) => Promise<ImplementationEntry[]>;
export declare function entriesByFolder(listFiles: () => Promise<ImplementationFile[]>, readFile: ReadFile, readFileMetadata: ReadFileMetadata, apiName: string): Promise<ImplementationEntry[]>;
export declare function entriesByFiles(files: ImplementationFile[], readFile: ReadFile, readFileMetadata: ReadFileMetadata, apiName: string): Promise<ImplementationEntry[]>;
export declare function blobToFileObj(name: string, blob: Blob): File;
export declare function getMediaAsBlob(path: string, id: string | null, readFile: ReadFile): Promise<Blob>;
export declare function getMediaDisplayURL(displayURL: DisplayURL, readFile: ReadFile, semaphore: Semaphore): Promise<string>;
export declare function runWithLock(lock: AsyncLock, func: Function, message: string): Promise<any>;
type LocalTree = {
    head: string;
    files: {
        id: string;
        name: string;
        path: string;
    }[];
};
type GetKeyArgs = {
    branch: string;
    folder: string;
    extension: string;
    depth: number;
};
type PersistLocalTreeArgs = GetKeyArgs & {
    localForage: LocalForage;
    localTree: LocalTree;
};
type GetLocalTreeArgs = GetKeyArgs & {
    localForage: LocalForage;
};
export declare function persistLocalTree({ localForage, localTree, branch, folder, extension, depth, }: PersistLocalTreeArgs): Promise<void>;
export declare function getLocalTree({ localForage, branch, folder, extension, depth, }: GetLocalTreeArgs): Promise<LocalTree | null>;
type GetDiffFromLocalTreeMethods = {
    getDifferences: (to: string, from: string) => Promise<{
        oldPath: string;
        newPath: string;
        status: string;
    }[]>;
    filterFile: (file: {
        path: string;
        name: string;
    }) => boolean;
    getFileId: (path: string) => Promise<string>;
};
type AllEntriesByFolderArgs = GetKeyArgs & GetDiffFromLocalTreeMethods & {
    listAllFiles: (folder: string, extension: string, depth: number) => Promise<ImplementationFile[]>;
    readFile: ReadFile;
    readFileMetadata: ReadFileMetadata;
    getDefaultBranch: () => Promise<{
        name: string;
        sha: string;
    }>;
    isShaExistsInBranch: (branch: string, sha: string) => Promise<boolean>;
    apiName: string;
    localForage: LocalForage;
    customFetch?: CustomFetchFunc;
};
export declare function allEntriesByFolder({ listAllFiles, readFile, readFileMetadata, apiName, branch, localForage, folder, extension, depth, getDefaultBranch, isShaExistsInBranch, getDifferences, getFileId, filterFile, customFetch, }: AllEntriesByFolderArgs): Promise<ImplementationEntry[]>;
export {};
