import { API as GithubAPI } from '../github';
import type { FetchError } from '@staticcms/core/lib/util';
import type { Config as GitHubConfig } from '../github/API';
type Config = GitHubConfig & {
    apiRoot: string;
    tokenPromise: () => Promise<string>;
    commitAuthor: {
        name: string;
    };
    isLargeMedia: (filename: string) => Promise<boolean>;
};
export default class API extends GithubAPI {
    tokenPromise: () => Promise<string>;
    commitAuthor: {
        name: string;
    };
    isLargeMedia: (filename: string) => Promise<boolean>;
    constructor(config: Config);
    hasWriteAccess(): Promise<boolean>;
    requestHeaders(headers?: {}): Promise<{
        Authorization: string;
        'Content-Type': string;
    }>;
    handleRequestError(error: FetchError & {
        msg: string;
    }, responseStatus: number): void;
    user(): Promise<{
        name: string;
        login: string;
    }>;
    getHeadReference(head: string): Promise<string>;
    commit(message: string, changeTree: {
        parentSha?: string;
        sha: string;
    }): Promise<any>;
    nextUrlProcessor(): (url: string) => string;
}
export {};
