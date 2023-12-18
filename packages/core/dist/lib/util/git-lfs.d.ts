import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
export interface PointerFile {
    size: number;
    sha: string;
}
export declare const parsePointerFile: (data: string) => PointerFile;
export declare const getLargeMediaPatternsFromGitAttributesFile: (...args: any[]) => any;
export declare function createPointerFile({ size, sha }: PointerFile): string;
export declare function getPointerFileForMediaFileObj(client: {
    uploadResource: (pointer: PointerFile, resource: Blob) => Promise<string>;
}, fileObj: File, path: string): Promise<{
    fileObj: File;
    size: number;
    sha: string;
    raw: string;
    path: string;
}>;
export declare function getLargeMediaFilteredMediaFiles(client: {
    uploadResource: (pointer: PointerFile, resource: Blob) => Promise<string>;
    matchPath: (path: string) => boolean;
}, mediaFiles: AssetProxy[]): Promise<(AssetProxy | {
    fileObj: File;
    size: number;
    sha: string;
    raw: string;
    path: string;
    url: string;
    field?: import("../..").MediaField | undefined;
})[]>;
