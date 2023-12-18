import * as fuzzy from 'fuzzy';
import type { Entry } from '@staticcms/core/interface';
export declare function fileSearch(entry: Entry | undefined, searchFields: string[], searchTerm: string): Entry[];
export declare function sortByScore<T>(a: fuzzy.FilterResult<T>, b: fuzzy.FilterResult<T>): 0 | 1 | -1;
