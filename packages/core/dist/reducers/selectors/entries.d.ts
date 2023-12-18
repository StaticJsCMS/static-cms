import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Entry, GroupMap } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
export declare function selectEntriesSort(entries: RootState, collection?: string): import("@staticcms/core/interface").SortMap | undefined;
export declare const selectEntriesFilter: (collectionName?: string) => (entries: RootState) => Record<string, import("@staticcms/core/interface").FilterMap>;
export declare function selectEntriesGroup(entries: RootState, collection?: string): Record<string, GroupMap>;
export declare const selectEntriesGroupField: (collection: string) => (entries: RootState) => GroupMap | undefined;
export declare const selectEntriesSortField: (collectionName: string) => (entries: RootState) => import("@staticcms/core/interface").SortObject | undefined;
export declare function selectViewStyle(entries: RootState): ViewStyle;
export declare function selectEntriesBySlugs(state: RootState): import("@staticcms/core/interface").Entities;
export declare function selectEntry(state: RootState, collection: string, slug: string): Entry<import("@staticcms/core/interface").ObjectValue>;
export declare const selectPublishedSlugs: (collection: string) => (state: RootState) => string[];
export declare const selectPublishedEntries: (collectionName: string) => (state: RootState) => Entry<import("@staticcms/core/interface").ObjectValue>[];
export declare function getGroup(entry: Entry, selectedGroup: GroupMap): {
    id: string;
    label: string;
    value: undefined;
} | {
    id: string;
    label: string;
    value: string | boolean;
};
export declare function selectEntryByPath(state: RootState, collection: string, path: string): Entry<import("@staticcms/core/interface").ObjectValue> | undefined;
export declare function selectEntriesLoaded(state: RootState, collection: string): boolean;
export declare function selectIsFetching(state: RootState, collection: string): boolean;
export declare function selectSearchedEntries(state: RootState, availableCollections: string[]): Entry<import("@staticcms/core/interface").ObjectValue>[];
