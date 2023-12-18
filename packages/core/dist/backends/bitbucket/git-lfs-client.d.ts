import type { ApiRequest, PointerFile } from '@staticcms/core/lib/util';
type MakeAuthorizedRequest = (req: ApiRequest) => Promise<Response>;
export default class GitLfsClient {
    enabled: boolean;
    rootURL: string;
    patterns: string[];
    private makeAuthorizedRequest;
    private static defaultContentHeaders;
    constructor(enabled: boolean, rootURL: string, patterns: string[], makeAuthorizedRequest: MakeAuthorizedRequest);
    matchPath(path: string): boolean;
    uploadResource(pointer: PointerFile, resource: Blob): Promise<string>;
    private doUpload;
    private doVerify;
    private getResourceUploadRequests;
}
export {};
