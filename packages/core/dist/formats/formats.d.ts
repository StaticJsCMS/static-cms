import type { BaseField, Collection, Entry } from '../interface';
import type FileFormatter from './FileFormatter';
export declare const frontmatterFormats: string[];
export declare const formatExtensions: {
    yml: string;
    yaml: string;
    toml: string;
    json: string;
    frontmatter: string;
    'json-frontmatter': string;
    'toml-frontmatter': string;
    'yaml-frontmatter': string;
};
export declare const extensionFormatters: Record<string, FileFormatter>;
export declare function resolveFormat<EF extends BaseField>(collection: Collection<EF>, entry: Entry): FileFormatter | undefined;
