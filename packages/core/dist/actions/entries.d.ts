import { Cursor } from '../lib/util';
import type { NavigateFunction } from 'react-router-dom';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { ViewStyle } from '../constants/views';
import type { Collection, Entry, EntryData, Field, FieldError, I18nSettings, ImplementationMediaFile, SortDirection, ValueOrNestedValue, ViewFilter, ViewGroup } from '../interface';
import type { RootState } from '../store';
import type AssetProxy from '../valueObjects/AssetProxy';
export declare function entryLoading(collection: Collection, slug: string): {
    readonly type: "ENTRY_REQUEST";
    readonly payload: {
        readonly collection: string;
        readonly slug: string;
    };
};
export declare function entryLoaded(collection: Collection, entry: Entry): {
    readonly type: "ENTRY_SUCCESS";
    readonly payload: {
        readonly collection: string;
        readonly entry: Entry<import("../interface").ObjectValue>;
    };
};
export declare function entryLoadError(error: Error, collection: Collection, slug: string): {
    readonly type: "ENTRY_FAILURE";
    readonly payload: {
        readonly error: Error;
        readonly collection: string;
        readonly slug: string;
    };
};
export declare function entriesLoading(collection: Collection): {
    readonly type: "ENTRIES_REQUEST";
    readonly payload: {
        readonly collection: string;
    };
};
export declare function filterEntriesRequest(collection: Collection, filter: ViewFilter): {
    readonly type: "FILTER_ENTRIES_REQUEST";
    readonly payload: {
        readonly collection: string;
        readonly filter: ViewFilter;
    };
};
export declare function filterEntriesSuccess(collection: Collection, filter: ViewFilter, entries: Entry[]): {
    readonly type: "FILTER_ENTRIES_SUCCESS";
    readonly payload: {
        readonly collection: string;
        readonly filter: ViewFilter;
        readonly entries: Entry<import("../interface").ObjectValue>[];
    };
};
export declare function filterEntriesFailure(collection: Collection, filter: ViewFilter, error: unknown): {
    readonly type: "FILTER_ENTRIES_FAILURE";
    readonly payload: {
        readonly collection: string;
        readonly filter: ViewFilter;
        readonly error: unknown;
    };
};
export declare function groupEntriesRequest(collection: Collection, group: ViewGroup): {
    readonly type: "GROUP_ENTRIES_REQUEST";
    readonly payload: {
        readonly collection: string;
        readonly group: ViewGroup;
    };
};
export declare function groupEntriesSuccess(collection: Collection, group: ViewGroup, entries: Entry[]): {
    readonly type: "GROUP_ENTRIES_SUCCESS";
    readonly payload: {
        readonly collection: string;
        readonly group: ViewGroup;
        readonly entries: Entry<import("../interface").ObjectValue>[];
    };
};
export declare function groupEntriesFailure(collection: Collection, group: ViewGroup, error: unknown): {
    readonly type: "GROUP_ENTRIES_FAILURE";
    readonly payload: {
        readonly collection: string;
        readonly group: ViewGroup;
        readonly error: unknown;
    };
};
export declare function sortEntriesRequest(collection: Collection, key: string, direction: SortDirection): {
    readonly type: "SORT_ENTRIES_REQUEST";
    readonly payload: {
        readonly collection: string;
        readonly key: string;
        readonly direction: SortDirection;
    };
};
export declare function sortEntriesSuccess(collection: Collection, key: string, direction: SortDirection, entries: Entry[]): {
    readonly type: "SORT_ENTRIES_SUCCESS";
    readonly payload: {
        readonly collection: string;
        readonly key: string;
        readonly direction: SortDirection;
        readonly entries: Entry<import("../interface").ObjectValue>[];
    };
};
export declare function sortEntriesFailure(collection: Collection, key: string, direction: SortDirection, error: unknown): {
    readonly type: "SORT_ENTRIES_FAILURE";
    readonly payload: {
        readonly collection: string;
        readonly key: string;
        readonly direction: SortDirection;
        readonly error: unknown;
    };
};
export declare function entriesLoaded(collection: Collection, entries: Entry[], pagination: number | null, cursor: Cursor, append?: boolean): {
    readonly type: "ENTRIES_SUCCESS";
    readonly payload: {
        readonly collection: string;
        readonly entries: Entry<import("../interface").ObjectValue>[];
        readonly page: number | null;
        readonly cursor: Cursor;
        readonly append: boolean;
    };
};
export declare function entriesFailed(collection: Collection, error: Error): {
    readonly type: "ENTRIES_FAILURE";
    readonly error: "Failed to load entries";
    readonly meta: {
        readonly collection: string;
    };
    readonly payload: string;
};
export declare function sortByField(collection: Collection, key: string, direction?: SortDirection): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function filterByField(collection: Collection, filter: ViewFilter): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function groupByField(collection: Collection, group: ViewGroup): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function changeViewStyle(viewStyle: ViewStyle): {
    readonly type: "CHANGE_VIEW_STYLE";
    readonly payload: {
        readonly style: ViewStyle;
    };
};
export declare function entryPersisting(collection: Collection, entry: Entry): {
    readonly type: "ENTRY_PERSIST_REQUEST";
    readonly payload: {
        readonly collectionName: string;
        readonly entrySlug: string;
    };
};
export declare function entryPersisted(collection: Collection, entry: Entry, slug: string): {
    readonly type: "ENTRY_PERSIST_SUCCESS";
    readonly payload: {
        readonly collectionName: string;
        readonly entrySlug: string;
        /**
         * Pass slug from backend for newly created entries.
         */
        readonly slug: string;
    };
};
export declare function entryPersistFail(collection: Collection, entry: Entry, error: Error): {
    readonly type: "ENTRY_PERSIST_FAILURE";
    readonly error: "Failed to persist entry";
    readonly payload: {
        readonly collectionName: string;
        readonly entrySlug: string;
        readonly error: string;
    };
};
export declare function entryDeleting(collection: Collection, slug: string): {
    readonly type: "ENTRY_DELETE_REQUEST";
    readonly payload: {
        readonly collectionName: string;
        readonly entrySlug: string;
    };
};
export declare function entryDeleted(collection: Collection, slug: string): {
    readonly type: "ENTRY_DELETE_SUCCESS";
    readonly payload: {
        readonly collectionName: string;
        readonly entrySlug: string;
    };
};
export declare function entryDeleteFail(collection: Collection, slug: string, error: Error): {
    readonly type: "ENTRY_DELETE_FAILURE";
    readonly payload: {
        readonly collectionName: string;
        readonly entrySlug: string;
        readonly error: string;
    };
};
export declare function emptyDraftCreated(entry: Entry): {
    readonly type: "DRAFT_CREATE_EMPTY";
    readonly payload: Entry<import("../interface").ObjectValue>;
};
export declare function createDraftFromEntry(collection: Collection, entry: Entry): {
    readonly type: "DRAFT_CREATE_FROM_ENTRY";
    readonly payload: {
        readonly collection: Collection;
        readonly entry: Entry<import("../interface").ObjectValue>;
    };
};
export declare function draftDuplicateEntry(entry: Entry): {
    readonly type: "DRAFT_CREATE_DUPLICATE_FROM_ENTRY";
    readonly payload: Entry<import("../interface").ObjectValue>;
};
export declare function discardDraft(): {
    readonly type: "DRAFT_DISCARD";
};
export declare function updateDraft({ data }: {
    data: EntryData;
}): {
    readonly type: "DRAFT_UPDATE";
    readonly payload: {
        readonly data: EntryData;
    };
};
export declare function changeDraftField({ path, field, value, i18n, isMeta, }: {
    path: string;
    field: Field;
    value: ValueOrNestedValue;
    i18n?: I18nSettings;
    isMeta: boolean;
}): {
    readonly type: "DRAFT_CHANGE_FIELD";
    readonly payload: {
        readonly path: string;
        readonly field: Field;
        readonly value: ValueOrNestedValue;
        readonly i18n: I18nSettings | undefined;
        readonly isMeta: boolean;
    };
};
export declare function clearDraftFieldChildValidation(path: string, i18n?: I18nSettings, isMeta?: boolean): {
    readonly type: "DRAFT_CLEAR_CHILD_VALIDATION";
    readonly payload: {
        readonly path: string;
        readonly i18n: I18nSettings | undefined;
        readonly isMeta: boolean | undefined;
    };
};
export declare function changeDraftFieldValidation(path: string, errors: FieldError[], i18n?: I18nSettings, isMeta?: boolean): {
    readonly type: "DRAFT_VALIDATION_ERRORS";
    readonly payload: {
        readonly path: string;
        readonly errors: FieldError[];
        readonly i18n: I18nSettings | undefined;
        readonly isMeta: boolean | undefined;
    };
};
export declare function localBackupRetrieved(entry: Entry): {
    readonly type: "DRAFT_LOCAL_BACKUP_RETRIEVED";
    readonly payload: {
        readonly entry: Entry<import("../interface").ObjectValue>;
    };
};
export declare function loadLocalBackup(): {
    readonly type: "DRAFT_CREATE_FROM_LOCAL_BACKUP";
};
export declare function deleteDraftLocalBackup(): {
    readonly type: "DRAFT_LOCAL_BACKUP_DELETE";
};
export declare function addDraftEntryMediaFile(file: ImplementationMediaFile): {
    readonly type: "ADD_DRAFT_ENTRY_MEDIA_FILE";
    readonly payload: ImplementationMediaFile;
};
export declare function removeDraftEntryMediaFile({ id }: {
    id: string;
}): {
    readonly type: "REMOVE_DRAFT_ENTRY_MEDIA_FILE";
    readonly payload: {
        readonly id: string;
    };
};
export declare function persistLocalBackup(entry: Entry, collection: Collection): (_dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<string | undefined>;
export declare function createDraftDuplicateFromEntry(entry: Entry): (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => void;
export declare function retrieveLocalBackup(collection: Collection, slug: string): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<{
    readonly type: "DRAFT_LOCAL_BACKUP_RETRIEVED";
    readonly payload: {
        readonly entry: Entry<import("../interface").ObjectValue>;
    };
} | undefined>;
export declare function deleteLocalBackup(collection: Collection, slug: string): (_dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function loadEntry(collection: Collection, slug: string, silent?: boolean): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function tryLoadEntry(state: RootState, collection: Collection, slug: string): Promise<Entry<import("../interface").ObjectValue>>;
export declare function loadEntries(collection: Collection, page?: number): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function traverseCollectionCursor(collection: Collection, action: string): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void | {
    readonly type: "ENTRIES_SUCCESS";
    readonly payload: {
        readonly collection: string;
        readonly entries: Entry<import("../interface").ObjectValue>[];
        readonly page: number | null;
        readonly cursor: Cursor;
        readonly append: boolean;
    };
}>;
export declare function createEmptyDraft(collection: Collection, search: string): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function getMediaAssets({ entry }: {
    entry: Entry;
}): AssetProxy[];
export declare function getSerializedEntry(collection: Collection, entry: Entry): Entry;
export declare function persistEntry(collection: Collection, rootSlug: string | undefined, navigate: NavigateFunction): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function deleteEntry(collection: Collection, slug: string): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<{
    readonly type: "ENTRY_DELETE_SUCCESS";
    readonly payload: {
        readonly collectionName: string;
        readonly entrySlug: string;
    };
}>;
export type EntriesAction = ReturnType<typeof entryLoading | typeof entryLoaded | typeof entryLoadError | typeof entriesLoading | typeof entriesLoaded | typeof entriesFailed | typeof changeViewStyle | typeof entryPersisting | typeof entryPersisted | typeof entryPersistFail | typeof entryDeleting | typeof entryDeleted | typeof entryDeleteFail | typeof emptyDraftCreated | typeof createDraftFromEntry | typeof draftDuplicateEntry | typeof discardDraft | typeof updateDraft | typeof changeDraftField | typeof clearDraftFieldChildValidation | typeof changeDraftFieldValidation | typeof localBackupRetrieved | typeof loadLocalBackup | typeof deleteDraftLocalBackup | typeof addDraftEntryMediaFile | typeof removeDraftEntryMediaFile | typeof filterEntriesRequest | typeof filterEntriesSuccess | typeof filterEntriesFailure | typeof groupEntriesRequest | typeof groupEntriesSuccess | typeof groupEntriesFailure | typeof sortEntriesRequest | typeof sortEntriesSuccess | typeof sortEntriesFailure>;
