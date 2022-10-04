import { isEqual } from 'lodash';

import { currentBackend } from '../backend';
import ValidationErrorTypes from '../constants/validationErrorTypes';
import { getIntegrationProvider } from '../integrations';
import { SortDirection } from '../interface';
import { getProcessSegment } from '../lib/formatters';
import { duplicateDefaultI18nFields, hasI18n, I18N_FIELD, serializeI18n } from '../lib/i18n';
import { serializeValues } from '../lib/serializeEntryValues';
import { Cursor } from '../lib/util';
import { selectIntegration, selectPublishedSlugs } from '../reducers';
import { selectFields, updateFieldByKey } from '../reducers/collections';
import { selectCollectionEntriesCursor } from '../reducers/cursors';
import { selectEntriesSortFields, selectEntryByPath, selectIsFetching } from '../reducers/entries';
import { selectCustomPath } from '../reducers/entryDraft';
import { navigateToEntry } from '../routing/history';
import { addSnackbar } from '../store/slices/snackbars';
import { createAssetProxy } from '../valueObjects/AssetProxy';
import { createEntry } from '../valueObjects/Entry';
import { addAssets, getAsset } from './media';
import { loadMedia, waitForMediaLibraryToLoad } from './mediaLibrary';
import { waitUntil } from './waitUntil';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { Backend } from '../backend';
import type {
  Collection,
  Entry,
  EntryField,
  ImplementationMediaFile,
  State,
  ViewFilter,
  ViewGroup,
} from '../interface';
import type AssetProxy from '../valueObjects/AssetProxy';

/*
 * Constant Declarations
 */
export const ENTRY_REQUEST = 'ENTRY_REQUEST';
export const ENTRY_SUCCESS = 'ENTRY_SUCCESS';
export const ENTRY_FAILURE = 'ENTRY_FAILURE';

export const ENTRIES_REQUEST = 'ENTRIES_REQUEST';
export const ENTRIES_SUCCESS = 'ENTRIES_SUCCESS';
export const ENTRIES_FAILURE = 'ENTRIES_FAILURE';

export const SORT_ENTRIES_REQUEST = 'SORT_ENTRIES_REQUEST';
export const SORT_ENTRIES_SUCCESS = 'SORT_ENTRIES_SUCCESS';
export const SORT_ENTRIES_FAILURE = 'SORT_ENTRIES_FAILURE';

export const FILTER_ENTRIES_REQUEST = 'FILTER_ENTRIES_REQUEST';
export const FILTER_ENTRIES_SUCCESS = 'FILTER_ENTRIES_SUCCESS';
export const FILTER_ENTRIES_FAILURE = 'FILTER_ENTRIES_FAILURE';

export const GROUP_ENTRIES_REQUEST = 'GROUP_ENTRIES_REQUEST';
export const GROUP_ENTRIES_SUCCESS = 'GROUP_ENTRIES_SUCCESS';
export const GROUP_ENTRIES_FAILURE = 'GROUP_ENTRIES_FAILURE';

export const DRAFT_CREATE_FROM_ENTRY = 'DRAFT_CREATE_FROM_ENTRY';
export const DRAFT_CREATE_EMPTY = 'DRAFT_CREATE_EMPTY';
export const DRAFT_DISCARD = 'DRAFT_DISCARD';
export const DRAFT_CHANGE_FIELD = 'DRAFT_CHANGE_FIELD';
export const DRAFT_VALIDATION_ERRORS = 'DRAFT_VALIDATION_ERRORS';
export const DRAFT_CLEAR_ERRORS = 'DRAFT_CLEAR_ERRORS';
export const DRAFT_LOCAL_BACKUP_RETRIEVED = 'DRAFT_LOCAL_BACKUP_RETRIEVED';
export const DRAFT_CREATE_FROM_LOCAL_BACKUP = 'DRAFT_CREATE_FROM_LOCAL_BACKUP';
export const DRAFT_CREATE_DUPLICATE_FROM_ENTRY = 'DRAFT_CREATE_DUPLICATE_FROM_ENTRY';

export const ENTRY_PERSIST_REQUEST = 'ENTRY_PERSIST_REQUEST';
export const ENTRY_PERSIST_SUCCESS = 'ENTRY_PERSIST_SUCCESS';
export const ENTRY_PERSIST_FAILURE = 'ENTRY_PERSIST_FAILURE';

export const ENTRY_DELETE_REQUEST = 'ENTRY_DELETE_REQUEST';
export const ENTRY_DELETE_SUCCESS = 'ENTRY_DELETE_SUCCESS';
export const ENTRY_DELETE_FAILURE = 'ENTRY_DELETE_FAILURE';

export const ADD_DRAFT_ENTRY_MEDIA_FILE = 'ADD_DRAFT_ENTRY_MEDIA_FILE';
export const REMOVE_DRAFT_ENTRY_MEDIA_FILE = 'REMOVE_DRAFT_ENTRY_MEDIA_FILE';

export const CHANGE_VIEW_STYLE = 'CHANGE_VIEW_STYLE';

/*
 * Simple Action Creators (Internal)
 * We still need to export them for tests
 */
export function entryLoading(collection: Collection, slug: string) {
  return {
    type: ENTRY_REQUEST,
    payload: {
      collection: collection.name,
      slug,
    },
  } as const;
}

export function entryLoaded(collection: Collection, entry: Entry) {
  return {
    type: ENTRY_SUCCESS,
    payload: {
      collection: collection.name,
      entry,
    },
  } as const;
}

export function entryLoadError(error: Error, collection: Collection, slug: string) {
  return {
    type: ENTRY_FAILURE,
    payload: {
      error,
      collection: collection.name,
      slug,
    },
  } as const;
}

export function entriesLoading(collection: Collection) {
  return {
    type: ENTRIES_REQUEST,
    payload: {
      collection: collection.name,
    },
  } as const;
}

export function filterEntriesSuccess(collection: Collection, filter: ViewFilter, entries: Entry[]) {
  return {
    type: FILTER_ENTRIES_SUCCESS,
    payload: {
      collection: collection.name,
      filter,
      entries,
    },
  } as const;
}

export function groupEntriesSuccess(collection: Collection, group: ViewGroup, entries: Entry[]) {
  return {
    type: GROUP_ENTRIES_SUCCESS,
    payload: {
      collection: collection.name,
      group,
      entries,
    },
  } as const;
}

export function sortEntriesSuccess(
  collection: Collection,
  key: string,
  direction: SortDirection,
  entries: Entry[],
) {
  return {
    type: SORT_ENTRIES_SUCCESS,
    payload: {
      collection: collection.name,
      key,
      direction,
      entries,
    },
  } as const;
}

export function entriesLoaded(
  collection: Collection,
  entries: Entry[],
  pagination: number | null,
  cursor: Cursor,
  append = true,
) {
  return {
    type: ENTRIES_SUCCESS,
    payload: {
      collection: collection.name,
      entries,
      page: pagination,
      cursor: Cursor.create(cursor),
      append,
    },
  } as const;
}

export function entriesFailed(collection: Collection, error: Error) {
  return {
    type: ENTRIES_FAILURE,
    error: 'Failed to load entries',
    payload: error.toString(),
    meta: { collection: collection.name },
  } as const;
}

async function getAllEntries(state: State, collection: Collection) {
  const configState = state.config;
  if (!configState.config) {
    throw new Error('Config not loaded');
  }

  const backend = currentBackend(configState.config);
  const integration = selectIntegration(state, collection.name, 'listEntries');
  const provider: Backend = integration
    ? getIntegrationProvider(state.integrations, backend.getToken, integration)
    : backend;
  const entries = await provider.listAllEntries(collection);
  return entries;
}

export function sortByField(
  collection: Collection,
  key: string,
  direction: SortDirection = SortDirection.Ascending,
) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    // if we're already fetching we update the sort key, but skip loading entries
    const isFetching = selectIsFetching(state.entries, collection.name);
    dispatch({
      type: SORT_ENTRIES_REQUEST,
      payload: {
        collection: collection.name,
        key,
        direction,
      },
    });
    if (isFetching) {
      return;
    }

    try {
      const entries = await getAllEntries(state, collection);
      dispatch(sortEntriesSuccess(collection, key, direction, entries));
    } catch (error) {
      dispatch({
        type: SORT_ENTRIES_FAILURE,
        payload: {
          collection: collection.name,
          key,
          direction,
          error,
        },
      });
    }
  };
}

export function filterByField(collection: Collection, filter: ViewFilter) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    // if we're already fetching we update the filter key, but skip loading entries
    const isFetching = selectIsFetching(state.entries, collection.name);
    dispatch({
      type: FILTER_ENTRIES_REQUEST,
      payload: {
        collection: collection.name,
        filter,
      },
    });
    if (isFetching) {
      return;
    }

    try {
      const entries = await getAllEntries(state, collection);
      dispatch(filterEntriesSuccess(collection, filter, entries));
    } catch (error) {
      dispatch({
        type: FILTER_ENTRIES_FAILURE,
        payload: {
          collection: collection.name,
          filter,
          error,
        },
      });
    }
  };
}

export function groupByField(collection: Collection, group: ViewGroup) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const isFetching = selectIsFetching(state.entries, collection.name);
    dispatch({
      type: GROUP_ENTRIES_REQUEST,
      payload: {
        collection: collection.name,
        group,
      },
    });
    if (isFetching) {
      return;
    }

    try {
      const entries = await getAllEntries(state, collection);
      dispatch(groupEntriesSuccess(collection, group, entries));
    } catch (error) {
      dispatch({
        type: GROUP_ENTRIES_FAILURE,
        payload: {
          collection: collection.name,
          group,
          error,
        },
      });
    }
  };
}

export function changeViewStyle(viewStyle: string) {
  return {
    type: CHANGE_VIEW_STYLE,
    payload: {
      style: viewStyle,
    },
  } as const;
}

export function entryPersisting(collection: Collection, entry: Entry) {
  return {
    type: ENTRY_PERSIST_REQUEST,
    payload: {
      collectionName: collection.name,
      entrySlug: entry.slug,
    },
  } as const;
}

export function entryPersisted(collection: Collection, entry: Entry, slug: string) {
  return {
    type: ENTRY_PERSIST_SUCCESS,
    payload: {
      collectionName: collection.name,
      entrySlug: entry.slug,

      /**
       * Pass slug from backend for newly created entries.
       */
      slug,
    },
  } as const;
}

export function entryPersistFail(collection: Collection, entry: Entry, error: Error) {
  return {
    type: ENTRY_PERSIST_FAILURE,
    error: 'Failed to persist entry',
    payload: {
      collectionName: collection.name,
      entrySlug: entry.slug,
      error: error.toString(),
    },
  } as const;
}

export function entryDeleting(collection: Collection, slug: string) {
  return {
    type: ENTRY_DELETE_REQUEST,
    payload: {
      collectionName: collection.name,
      entrySlug: slug,
    },
  } as const;
}

export function entryDeleted(collection: Collection, slug: string) {
  return {
    type: ENTRY_DELETE_SUCCESS,
    payload: {
      collectionName: collection.name,
      entrySlug: slug,
    },
  } as const;
}

export function entryDeleteFail(collection: Collection, slug: string, error: Error) {
  return {
    type: ENTRY_DELETE_FAILURE,
    payload: {
      collectionName: collection.name,
      entrySlug: slug,
      error: error.toString(),
    },
  } as const;
}

export function emptyDraftCreated(entry: Entry) {
  return {
    type: DRAFT_CREATE_EMPTY,
    payload: entry,
  } as const;
}
/*
 * Exported simple Action Creators
 */
export function createDraftFromEntry(entry: Entry) {
  return {
    type: DRAFT_CREATE_FROM_ENTRY,
    payload: { entry },
  } as const;
}

export function draftDuplicateEntry(entry: Entry) {
  return {
    type: DRAFT_CREATE_DUPLICATE_FROM_ENTRY,
    payload: createEntry(entry.collection, '', '', {
      data: entry.data,
      mediaFiles: entry.mediaFiles,
    }),
  } as const;
}

export function discardDraft() {
  return { type: DRAFT_DISCARD } as const;
}

export function changeDraftField({
  field,
  value,
  metadata,
  entries,
  i18n,
}: {
  field: EntryField;
  value: string;
  metadata: Record<string, unknown>;
  entries: Entry[];
  i18n?: {
    currentLocale: string;
    defaultLocale: string;
    locales: string[];
  };
}) {
  return {
    type: DRAFT_CHANGE_FIELD,
    payload: { field, value, metadata, entries, i18n },
  } as const;
}

export function changeDraftFieldValidation(
  uniquefieldId: string,
  errors: { type: string; parentIds: string[]; message: string }[],
) {
  return {
    type: DRAFT_VALIDATION_ERRORS,
    payload: { uniquefieldId, errors },
  } as const;
}

export function clearFieldErrors() {
  return { type: DRAFT_CLEAR_ERRORS } as const;
}

export function localBackupRetrieved(entry: Entry) {
  return {
    type: DRAFT_LOCAL_BACKUP_RETRIEVED,
    payload: { entry },
  } as const;
}

export function loadLocalBackup() {
  return {
    type: DRAFT_CREATE_FROM_LOCAL_BACKUP,
  } as const;
}

export function addDraftEntryMediaFile(file: ImplementationMediaFile) {
  return { type: ADD_DRAFT_ENTRY_MEDIA_FILE, payload: file } as const;
}

export function removeDraftEntryMediaFile({ id }: { id: string }) {
  return { type: REMOVE_DRAFT_ENTRY_MEDIA_FILE, payload: { id } } as const;
}

export function persistLocalBackup(entry: Entry, collection: Collection) {
  return (_dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);

    return backend.persistLocalDraftBackup(entry, collection);
  };
}

export function createDraftDuplicateFromEntry(entry: Entry) {
  return (dispatch: ThunkDispatch<State, {}, AnyAction>) => {
    dispatch(
      waitUntil({
        predicate: ({ type }) => type === DRAFT_CREATE_EMPTY,
        run: () => dispatch(draftDuplicateEntry(entry)),
      }),
    );
  };
}

export function retrieveLocalBackup(collection: Collection, slug: string) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);
    const { entry } = await backend.getLocalDraftBackup(collection, slug);

    if (entry) {
      // load assets from backup
      const mediaFiles = entry.mediaFiles || [];
      const assetProxies: AssetProxy[] = await Promise.all(
        mediaFiles.map(file => {
          if (file.file || file.url) {
            return createAssetProxy({
              path: file.path,
              file: file.file,
              url: file.url,
              field: file.field,
            });
          } else {
            return getAsset({
              collection,
              entry,
              path: file.path,
              field: file.field,
            })(dispatch, getState);
          }
        }),
      );
      dispatch(addAssets(assetProxies));

      return dispatch(localBackupRetrieved(entry));
    }
  };
}

export function deleteLocalBackup(collection: Collection, slug: string) {
  return (_dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);
    return backend.deleteLocalDraftBackup(collection, slug);
  };
}

/*
 * Exported Thunk Action Creators
 */

export function loadEntry(collection: Collection, slug: string, silent = false) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    await waitForMediaLibraryToLoad(dispatch, getState());
    if (!silent) {
      dispatch(entryLoading(collection, slug));
    }

    try {
      const loadedEntry = await tryLoadEntry(getState(), collection, slug);
      dispatch(entryLoaded(collection, loadedEntry));
      dispatch(createDraftFromEntry(loadedEntry));
    } catch (error: any) {
      console.error(error);
      dispatch(
        addSnackbar({
          type: 'error',
          message: {
            key: 'ui.toast.onFailToLoadEntries',
            details: error.message,
          },
        }),
      );
      dispatch(entryLoadError(error, collection, slug));
    }
  };
}

export async function tryLoadEntry(state: State, collection: Collection, slug: string) {
  const configState = state.config;
  if (!configState.config) {
    throw new Error('Config not loaded');
  }

  const backend = currentBackend(configState.config);
  const loadedEntry = await backend.getEntry(state, collection, slug);
  return loadedEntry;
}

interface AppendAction {
  action: string;
  append: boolean;
}

const appendActions = {
  append_next: { action: 'next', append: true },
} as Record<string, AppendAction>;

function addAppendActionsToCursor(cursor: Cursor) {
  return Cursor.create(cursor).updateStore(store => ({
    ...store,
    actions: new Set(
      ...store.actions,
      ...(Object.entries(appendActions)
        .filter(([_k, v]) => store.actions.has(v.action as string))
        .map(([k, _v]) => k) as string[]),
    ),
  }));
}

export function loadEntries(collection: Collection, page = 0) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    if (collection.isFetching) {
      return;
    }
    const state = getState();
    const sortFields = selectEntriesSortFields(state.entries, collection.name);
    if (sortFields && sortFields.length > 0) {
      const field = sortFields[0];
      return dispatch(sortByField(collection, field.key, field.direction));
    }

    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);
    const integration = selectIntegration(state, collection.name, 'listEntries');
    const provider = integration
      ? getIntegrationProvider(state.integrations, backend.getToken, integration)
      : backend;
    const append = !!(page && !isNaN(page) && page > 0);
    dispatch(entriesLoading(collection));

    try {
      const loadAllEntries = 'nested' in collection || hasI18n(collection);

      let response: {
        cursor: Cursor;
        pagination: number;
        entries: Entry[];
      } = await (loadAllEntries
        ? // nested collections require all entries to construct the tree
          provider.listAllEntries(collection).then((entries: Entry[]) => ({ entries }))
        : provider.listEntries(collection, page));
      response = {
        ...response,
        // The only existing backend using the pagination system is the
        // Algolia integration, which is also the only integration used
        // to list entries. Thus, this checking for an integration can
        // determine whether or not this is using the old integer-based
        // pagination API. Other backends will simply store an empty
        // cursor, which behaves identically to no cursor at all.
        cursor: integration
          ? Cursor.create({
              actions: ['next'],
              meta: { usingOldPaginationAPI: true },
              data: { nextPage: page + 1 },
            })
          : Cursor.create(response.cursor),
      };

      dispatch(
        entriesLoaded(
          collection,
          response.cursor.meta!.usingOldPaginationAPI
            ? response.entries.reverse()
            : response.entries,
          response.pagination,
          addAppendActionsToCursor(response.cursor),
          append,
        ),
      );
    } catch (err: any) {
      dispatch(
        addSnackbar({
          type: 'error',
          message: {
            key: 'ui.toast.onFailToLoadEntries',
            details: err,
          },
        }),
      );
      return Promise.reject(dispatch(entriesFailed(collection, err)));
    }
  };
}

function traverseCursor(backend: Backend, cursor: Cursor, action: string) {
  if (!cursor.actions!.has(action)) {
    throw new Error(`The current cursor does not support the pagination action "${action}".`);
  }
  return backend.traverseCursor(cursor, action);
}

export function traverseCollectionCursor(collection: Collection, action: string) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const collectionName = collection.name;
    if (state.entries.pages?.[collectionName]?.isFetching) {
      return;
    }

    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);

    const { action: realAction, append } =
      action in appendActions ? appendActions[action] : { action, append: false };
    const cursor = selectCollectionEntriesCursor(state.cursors, collection.name);

    // Handle cursors representing pages in the old, integer-based pagination API
    if (cursor.meta?.usingOldPaginationAPI ?? false) {
      return dispatch(loadEntries(collection, cursor.data!.nextPage as number));
    }

    try {
      dispatch(entriesLoading(collection));
      const { entries, cursor: newCursor } = await traverseCursor(backend, cursor, realAction);

      const pagination = newCursor.meta?.page as number | null;
      return dispatch(
        entriesLoaded(collection, entries, pagination, addAppendActionsToCursor(newCursor), append),
      );
    } catch (err: any) {
      console.error(err);
      dispatch(
        addSnackbar({
          type: 'error',
          message: {
            key: 'ui.toast.onFailToLoadEntries',
            details: err,
          },
        }),
      );
      return Promise.reject(dispatch(entriesFailed(collection, err)));
    }
  };
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function processValue(unsafe: string) {
  if (['true', 'True', 'TRUE'].includes(unsafe)) {
    return true;
  }
  if (['false', 'False', 'FALSE'].includes(unsafe)) {
    return false;
  }

  return escapeHtml(unsafe);
}

function getDataFields(fields: EntryField[]) {
  return fields.filter(f => !f!.meta);
}

function getMetaFields(fields: EntryField[]) {
  return fields.filter(f => f!.meta === true);
}

export function createEmptyDraft(collection: Collection, search: string) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const params = new URLSearchParams(search);
    params.forEach((value, key) => {
      collection = updateFieldByKey(collection, key, field => {
        field.default = processValue(value);
        return field;
      });
    });

    const fields = collection.fields ?? [];

    const dataFields = getDataFields(fields);
    const data = createEmptyDraftData(dataFields);

    const metaFields = getMetaFields(fields);
    const meta = createEmptyDraftData(metaFields);

    const state = getState();
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);

    if (!('media_folder' in collection)) {
      await waitForMediaLibraryToLoad(dispatch, getState());
    }

    const i18nFields = createEmptyDraftI18nData(collection, dataFields);

    let newEntry = createEntry(collection.name, '', '', {
      data,
      i18n: i18nFields,
      mediaFiles: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta: meta as any,
    });
    newEntry = await backend.processEntry(state, collection, newEntry);
    dispatch(emptyDraftCreated(newEntry));
  };
}

interface DraftEntryData {
  [name: string]:
    | string
    | null
    | boolean
    | unknown[]
    | DraftEntryData
    | DraftEntryData[]
    | (string | DraftEntryData | boolean | unknown[])[];
}

export function createEmptyDraftData(
  fields: EntryField[],
  skipField: (field: EntryField) => boolean = () => false,
) {
  return fields.reduce(
    (
      reduction: DraftEntryData | string | undefined | boolean | unknown[],
      value: EntryField | undefined | boolean,
    ) => {
      const acc = reduction as DraftEntryData;
      const item = value as EntryField;

      if (skipField(item)) {
        return acc;
      }

      const subfields = item.field || item.fields;
      const list = item.widget == 'list';
      const name = item.name;
      const defaultValue = item.default ?? null;

      function isEmptyDefaultValue(val: unknown) {
        return [[{}], {}].some(e => isEqual(val, e));
      }

      if (subfields) {
        if (list && Array.isArray(defaultValue)) {
          acc[name] = defaultValue;
        } else {
          const asList = Array.isArray(subfields) ? subfields : [subfields];

          const subDefaultValue = Array.isArray(subfields)
            ? [createEmptyDraftData(asList, skipField)]
            : createEmptyDraftData(asList, skipField);

          if (!isEmptyDefaultValue(subDefaultValue)) {
            acc[name] = subDefaultValue;
          }
        }
        return acc;
      }

      if (defaultValue !== null) {
        acc[name] = defaultValue;
      }

      return acc;
    },
    {} as DraftEntryData,
  );
}

function createEmptyDraftI18nData(collection: Collection, dataFields: EntryField[]) {
  if (!hasI18n(collection)) {
    return {};
  }

  function skipField(field: EntryField) {
    return field.i18n !== I18N_FIELD.DUPLICATE && field.i18n !== I18N_FIELD.TRANSLATE;
  }

  const i18nData = createEmptyDraftData(dataFields, skipField);
  return duplicateDefaultI18nFields(collection, i18nData);
}

export function getMediaAssets({ entry }: { entry: Entry }) {
  const filesArray = entry.mediaFiles;
  const assets = filesArray
    .filter(file => file.draft)
    .map(file =>
      createAssetProxy({
        path: file.path,
        file: file.file,
        url: file.url,
        field: file.field,
      }),
    );

  return assets;
}

export function getSerializedEntry(collection: Collection, entry: Entry) {
  /**
   * Serialize the values of any fields with registered serializers, and
   * update the entry and entryDraft with the serialized values.
   */
  const fields = selectFields(collection, entry.slug);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function serializeData(data: any) {
    return serializeValues(data, fields);
  }

  let serializedEntry = {
    ...entry,
    data: serializeData(entry.data),
  };
  if (hasI18n(collection)) {
    serializedEntry = serializeI18n(collection, serializedEntry, serializeData);
  }
  return serializedEntry;
}

export function persistEntry(collection: Collection) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const entryDraft = state.entryDraft;
    const fieldsErrors = entryDraft.fieldsErrors;
    const usedSlugs = selectPublishedSlugs(state, collection.name);

    // Early return if draft contains validation errors
    if (Object.keys(fieldsErrors).length > 0) {
      const hasPresenceErrors = Object.values(fieldsErrors).find(errors =>
        errors.some(error => error.type && error.type === ValidationErrorTypes.PRESENCE),
      );

      if (hasPresenceErrors) {
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.missingRequiredField',
            },
          }),
        );
      }

      return Promise.reject();
    }

    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);
    const entry = entryDraft.entry;
    if (!entry) {
      return Promise.reject();
    }

    const assetProxies = getMediaAssets({
      entry,
    });

    const serializedEntry = getSerializedEntry(collection, entry);
    const newEntryDraft = {
      ...entryDraft,
      entry: serializedEntry,
    };
    dispatch(entryPersisting(collection, serializedEntry));
    return backend
      .persistEntry({
        config: configState.config,
        collection,
        entryDraft: newEntryDraft,
        assetProxies,
        usedSlugs,
      })
      .then(async (newSlug: string) => {
        dispatch(
          addSnackbar({
            type: 'success',
            message: {
              key: 'ui.toast.entrySaved',
            },
          }),
        );

        // re-load media library if entry had media files
        if (assetProxies.length > 0) {
          await dispatch(loadMedia());
        }
        dispatch(entryPersisted(collection, serializedEntry, newSlug));
        if ('nested' in collection) {
          await dispatch(loadEntries(collection));
        }
        if (entry.slug !== newSlug) {
          await dispatch(loadEntry(collection, newSlug));
          navigateToEntry(collection.name, newSlug);
        } else {
          await dispatch(loadEntry(collection, newSlug, true));
        }
      })
      .catch((error: Error) => {
        console.error(error);
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.onFailToPersist',
              details: error,
            },
          }),
        );
        return Promise.reject(dispatch(entryPersistFail(collection, serializedEntry, error)));
      });
  };
}

export function deleteEntry(collection: Collection, slug: string) {
  return (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const backend = currentBackend(configState.config);

    dispatch(entryDeleting(collection, slug));
    return backend
      .deleteEntry(state, collection, slug)
      .then(() => {
        return dispatch(entryDeleted(collection, slug));
      })
      .catch((error: Error) => {
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.onFailToDelete',
              details: error,
            },
          }),
        );
        console.error(error);
        return Promise.reject(dispatch(entryDeleteFail(collection, slug, error)));
      });
  };
}

function getPathError(
  path: string | undefined,
  key: string,
  t: (key: string, args: Record<string, unknown>) => string,
) {
  return {
    error: {
      type: ValidationErrorTypes.CUSTOM,
      message: t(`editor.editorControlPane.widget.${key}`, {
        path,
      }),
    },
  };
}

export function validateMetaField(
  state: State,
  collection: Collection,
  field: EntryField,
  value: string | undefined,
  t: (key: string, args: Record<string, unknown>) => string,
) {
  const configState = state.config;
  if (!configState.config) {
    throw new Error('Config not loaded');
  }

  if (field.meta && field.name === 'path') {
    if (!value) {
      return getPathError(value, 'invalidPath', t);
    }
    const sanitizedPath = (value as string)
      .split('/')
      .map(getProcessSegment(configState.config.slug))
      .join('/');

    if (value !== sanitizedPath) {
      return getPathError(value, 'invalidPath', t);
    }

    const customPath = selectCustomPath(collection, { entry: { meta: { path: value } } });
    const existingEntry = customPath
      ? selectEntryByPath(state.entries, collection.name, customPath)
      : undefined;

    const existingEntryPath = existingEntry?.path;
    const draftPath = state.entryDraft?.entry?.path;

    if (existingEntryPath && existingEntryPath !== draftPath) {
      return getPathError(value, 'pathExists', t);
    }
  }
  return { error: false };
}

export type EntriesAction = ReturnType<
  | typeof entryLoading
  | typeof entryLoaded
  | typeof entryLoadError
  | typeof entriesLoading
  | typeof entriesLoaded
  | typeof entriesFailed
  | typeof changeViewStyle
  | typeof entryPersisting
  | typeof entryPersisted
  | typeof entryPersistFail
  | typeof entryDeleting
  | typeof entryDeleted
  | typeof entryDeleteFail
  | typeof emptyDraftCreated
  | typeof createDraftFromEntry
  | typeof draftDuplicateEntry
  | typeof discardDraft
  | typeof changeDraftField
  | typeof changeDraftFieldValidation
  | typeof clearFieldErrors
  | typeof localBackupRetrieved
  | typeof loadLocalBackup
  | typeof addDraftEntryMediaFile
  | typeof removeDraftEntryMediaFile
  | typeof filterEntriesSuccess
  | typeof groupEntriesSuccess
  | typeof sortEntriesSuccess
>;
