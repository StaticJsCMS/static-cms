import { API as GitlabAPI } from '../gitlab';
import type { Config as GitLabConfig, CommitAuthor } from '../gitlab/API';
import type { ApiRequest } from '@staticcms/core/lib/util';
type Config = GitLabConfig & {
    tokenPromise: () => Promise<string>;
    commitAuthor: CommitAuthor;
};
export default class API extends GitlabAPI {
    tokenPromise: () => Promise<string>;
    constructor(config: Config);
    withAuthorizationHeaders: (req: ApiRequest) => Promise<import("../../lib/util/API").ApiRequestObject>;
    hasWriteAccess: () => Promise<boolean>;
}
export {};
