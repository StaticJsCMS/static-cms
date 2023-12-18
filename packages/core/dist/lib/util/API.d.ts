import type { AsyncLock } from './asyncLock';
import type { FileMetadata } from '@staticcms/core/interface';
export declare class FetchError extends Error {
    status: number;
    constructor(message: string, status: number);
}
interface API {
    rateLimiter?: AsyncLock;
    buildRequest: (req: ApiRequest) => ApiRequest | Promise<ApiRequest>;
    requestFunction?: (req: ApiRequest) => Promise<Response>;
}
export interface ApiRequestURL {
    url: string;
    params?: Record<string, string>;
}
export type ApiRequestObject = RequestInit & ApiRequestURL;
export type ApiRequest = ApiRequestObject | string;
export declare function requestWithBackoff(api: API, req: ApiRequest, attempt?: number): Promise<Response>;
export declare function readFile(id: string | null | undefined, fetchContent: () => Promise<string | Blob>, localForage: LocalForage, isText: boolean): Promise<string | Blob>;
export declare function readFileMetadata(id: string | null | undefined, fetchMetadata: () => Promise<FileMetadata>, localForage: LocalForage): Promise<FileMetadata>;
export declare function throwOnConflictingBranches(branchName: string, getBranch: (name: string) => Promise<{
    name: string;
}>, apiName: string): Promise<void>;
export {};
