import type { Slug } from '../interface';
export declare function getCollectionUrl(collectionName: string, direct?: boolean): string;
export declare function getNewEntryUrl(collectionName: string, direct?: boolean): string;
export declare function addParams(urlString: string, params: Record<string, string>): string;
export declare function stripProtocol(urlString: string): string;
export declare function getCharReplacer(encoding: string, replacement: string): (char: string) => string;
export declare function sanitizeURI(str: string, options?: {
    replacement: Slug['sanitize_replacement'];
    encoding: Slug['encoding'];
}): string;
export declare function sanitizeChar(char: string, options?: Slug): string;
export declare function sanitizeSlug(str: string, options?: Slug): string;
export declare function joinUrlPath(base: string, ...path: string[]): string;
