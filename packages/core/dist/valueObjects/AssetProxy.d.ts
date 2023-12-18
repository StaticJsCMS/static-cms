import type { MediaField } from '../interface';
interface AssetProxyArgs {
    path: string;
    url?: string;
    file?: File;
    field?: MediaField;
}
export default class AssetProxy {
    url: string;
    fileObj?: File;
    path: string;
    field?: MediaField;
    constructor({ url, file, path, field }: AssetProxyArgs);
    toString(): string;
    toBase64(): Promise<string>;
}
export declare function createAssetProxy({ url, file, path, field }: AssetProxyArgs): AssetProxy;
export {};
