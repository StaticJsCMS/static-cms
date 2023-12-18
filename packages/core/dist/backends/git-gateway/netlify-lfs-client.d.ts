import type { ApiRequest, PointerFile } from '@staticcms/core/lib/util';
type MakeAuthorizedRequest = (req: ApiRequest) => Promise<Response>;
type ImageTransformations = {
    nf_resize: string;
    w: number;
    h: number;
};
type ClientConfig = {
    rootURL: string;
    makeAuthorizedRequest: MakeAuthorizedRequest;
    patterns: string[];
    enabled: boolean;
    transformImages: ImageTransformations | boolean;
};
export declare function matchPath({ patterns }: ClientConfig, path: string): boolean;
export type Client = {
    resourceExists: (pointer: PointerFile) => Promise<boolean | undefined>;
    getResourceUploadURLs: (objects: PointerFile[]) => Promise<string>;
    getDownloadURL: (pointer: PointerFile) => Promise<{
        url: string;
        blob: Blob;
    }>;
    uploadResource: (pointer: PointerFile, blob: Blob) => Promise<string>;
    matchPath: (path: string) => boolean;
    patterns: string[];
    enabled: boolean;
};
export declare function getClient(clientConfig: ClientConfig): any;
export {};
