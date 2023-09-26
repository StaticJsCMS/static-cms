import { currentBackend } from '../backend';
import {
  UNPUBLISHED_ENTRIES_FAILURE,
  UNPUBLISHED_ENTRIES_REQUEST,
  UNPUBLISHED_ENTRIES_SUCCESS,
  UNPUBLISHED_ENTRY_DELETE_FAILURE,
  UNPUBLISHED_ENTRY_DELETE_REQUEST,
  UNPUBLISHED_ENTRY_DELETE_SUCCESS,
  UNPUBLISHED_ENTRY_PERSIST_FAILURE,
  UNPUBLISHED_ENTRY_PERSIST_REQUEST,
  UNPUBLISHED_ENTRY_PERSIST_SUCCESS,
  UNPUBLISHED_ENTRY_PUBLISH_FAILURE,
  UNPUBLISHED_ENTRY_PUBLISH_REQUEST,
  UNPUBLISHED_ENTRY_PUBLISH_SUCCESS,
  UNPUBLISHED_ENTRY_REDIRECT,
  UNPUBLISHED_ENTRY_REQUEST,
  UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE,
  UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST,
  UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS,
  UNPUBLISHED_ENTRY_SUCCESS,
} from '../constants';
import { EDITORIAL_WORKFLOW, WorkflowStatus } from '../constants/publishModes';
import ValidationErrorTypes from '../constants/validationErrorTypes';
import { EditorialWorkflowError } from '../lib';
import { slugFromCustomPath } from '../lib/util/nested.util';
import {
  selectUnpublishedEntry,
  selectUnpublishedSlugs,
} from '../reducers/selectors/editorialWorkflow';
import { selectEntry, selectPublishedSlugs } from '../reducers/selectors/entries';
import { selectEditingDraft } from '../reducers/selectors/entryDraft';
import { addSnackbar } from '../store/slices/snackbars';
import { createAssetProxy } from '../valueObjects/AssetProxy';
import {
  createDraftFromEntry,
  entryDeleted,
  getMediaAssets,
  getSerializedEntry,
  loadEntries,
  loadEntry,
} from './entries';
import { addAssets } from './media';
import { loadMedia } from './mediaLibrary';

import type { NavigateFunction } from 'react-router-dom';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { Collection, Collections, Config, Entry, EntryDraft } from '../interface';
import type { RootState } from '../store';

/*
 * Simple Action Creators (Internal)
 */

function unpublishedEntryLoading(collection: Collection, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_REQUEST,
    payload: {
      collection: collection.name,
      slug,
    },
  } as const;
}

function unpublishedEntryLoaded(collection: Collection, entry: Entry) {
  return {
    type: UNPUBLISHED_ENTRY_SUCCESS,
    payload: {
      collection: collection.name,
      entry,
    },
  } as const;
}

function unpublishedEntryRedirected(collection: Collection, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_REDIRECT,
    payload: {
      collection: collection.name,
      slug,
    },
  } as const;
}

function unpublishedEntriesLoading() {
  return {
    type: UNPUBLISHED_ENTRIES_REQUEST,
  } as const;
}

function unpublishedEntriesLoaded(entries: Entry[], pagination: number) {
  return {
    type: UNPUBLISHED_ENTRIES_SUCCESS,
    payload: {
      entries,
      pages: pagination,
    },
  } as const;
}

function unpublishedEntriesFailed(error: Error) {
  return {
    type: UNPUBLISHED_ENTRIES_FAILURE,
    error: 'Failed to load entries',
    payload: error,
  } as const;
}

function unpublishedEntryPersisting(collection: Collection, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_REQUEST,
    payload: {
      collection: collection.name,
      slug,
    },
  } as const;
}

function unpublishedEntryPersisted(collection: Collection, entry: Entry) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_SUCCESS,
    payload: {
      collection: collection.name,
      entry,
      slug: entry.slug,
    },
  } as const;
}

function unpublishedEntryPersistedFail(error: unknown, collection: Collection, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_FAILURE,
    payload: {
      error,
      collection: collection.name,
      slug,
    },
    error,
  } as const;
}

function unpublishedEntryStatusChangeRequest(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST,
    payload: {
      collection,
      slug,
    },
  } as const;
}

function unpublishedEntryStatusChangePersisted(
  collection: string,
  slug: string,
  newStatus: WorkflowStatus,
) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS,
    payload: {
      collection,
      slug,
      newStatus,
    },
  } as const;
}

function unpublishedEntryStatusChangeError(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE,
    payload: { collection, slug },
  } as const;
}

function unpublishedEntryPublishRequest(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_REQUEST,
    payload: { collection, slug },
  } as const;
}

function unpublishedEntryPublished(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_SUCCESS,
    payload: { collection, slug },
  } as const;
}

function unpublishedEntryPublishError(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_FAILURE,
    payload: { collection, slug },
  } as const;
}

function unpublishedEntryDeleteRequest(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_DELETE_REQUEST,
    payload: { collection, slug },
  } as const;
}

function unpublishedEntryDeleted(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_DELETE_SUCCESS,
    payload: { collection, slug },
  } as const;
}

function unpublishedEntryDeleteError(collection: string, slug: string) {
  return {
    type: UNPUBLISHED_ENTRY_DELETE_FAILURE,
    payload: { collection, slug },
  } as const;
}

/*
 * Exported Thunk Action Creators
 */

export function loadUnpublishedEntry(collection: Collection, slug: string) {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);
    const entriesLoaded = state.editorialWorkflow.ids;
    //run possible unpublishedEntries migration
    if (!entriesLoaded) {
      try {
        const { entries, pagination } = await backend.unpublishedEntries(state.collections);
        dispatch(unpublishedEntriesLoaded(entries, pagination));
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    dispatch(unpublishedEntryLoading(collection, slug));

    try {
      const entry = await backend.unpublishedEntry(state, collection, slug);
      const assetProxies = await Promise.all(
        entry.mediaFiles
          .filter(file => file.draft)
          .map(({ url, file, path }) =>
            createAssetProxy({
              path,
              url,
              file,
            }),
          ),
      );
      dispatch(addAssets(assetProxies));
      dispatch(unpublishedEntryLoaded(collection, entry));
      dispatch(createDraftFromEntry(collection, entry));
    } catch (error) {
      if (error instanceof EditorialWorkflowError && error.notUnderEditorialWorkflow) {
        dispatch(unpublishedEntryRedirected(collection, slug));
        dispatch(loadEntry(collection, slug));
      } else {
        console.error(error);
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.onFailToLoadEntries',
              options: {
                details: error,
              },
            },
          }),
        );
      }
    }
  };
}

export function loadUnpublishedEntries(collections: Collections) {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);

    if (state.config.config.publish_mode !== EDITORIAL_WORKFLOW) {
      return;
    }

    dispatch(unpublishedEntriesLoading());
    backend
      .unpublishedEntries(collections)
      .then(response => dispatch(unpublishedEntriesLoaded(response.entries, response.pagination)))
      .catch((error: Error) => {
        console.error(error);
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.onFailToLoadEntries',
              options: {
                details: error,
              },
            },
          }),
        );
        dispatch(unpublishedEntriesFailed(error));
        Promise.reject(error);
      });
  };
}

export function persistUnpublishedEntry(
  collection: Collection,
  rootSlug: string | undefined,
  existingUnpublishedEntry: boolean,
  navigate: NavigateFunction,
) {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const entryDraft = state.entryDraft;
    const fieldsErrors = entryDraft.fieldsErrors;
    const unpublishedSlugs = selectUnpublishedSlugs(state, collection.name);
    const publishedSlugs = selectPublishedSlugs(collection.name)(state);
    const usedSlugs = publishedSlugs.concat(unpublishedSlugs);
    const entriesLoaded = state.editorialWorkflow.ids;

    //load unpublishedEntries
    !entriesLoaded && dispatch(loadUnpublishedEntries(state.collections));

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

    const backend = currentBackend(state.config.config);
    const entry = entryDraft.entry;
    if (!entry) {
      return;
    }

    entry.status = WorkflowStatus.DRAFT;

    const assetProxies = getMediaAssets({
      entry,
    });

    let serializedEntry = getSerializedEntry(collection, entry);
    serializedEntry = {
      ...serializedEntry,
      raw: backend.entryToRaw(collection, serializedEntry),
    };
    const serializedEntryDraft: EntryDraft = {
      ...(entryDraft as EntryDraft),
      entry: serializedEntry,
    };

    dispatch(unpublishedEntryPersisting(collection, entry.slug));
    const persistAction = existingUnpublishedEntry
      ? backend.persistUnpublishedEntry
      : backend.persistEntry;

    try {
      const newSlug = await persistAction.call(backend, {
        config: state.config.config,
        collection,
        entryDraft: serializedEntryDraft,
        assetProxies,
        rootSlug,
        usedSlugs,
        status: WorkflowStatus.DRAFT,
      });
      dispatch(
        addSnackbar({
          type: 'success',
          message: {
            key: 'ui.toast.entrySaved',
          },
        }),
      );
      dispatch(unpublishedEntryPersisted(collection, serializedEntry));

      if (entry.slug !== newSlug) {
        navigate(`/collections/${collection.name}/entries/${newSlug}`);
        return;
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          type: 'error',
          message: {
            key: 'ui.toast.onFailToPersist',
            options: {
              details: error,
            },
          },
        }),
      );
      return Promise.reject(dispatch(unpublishedEntryPersistedFail(error, collection, entry.slug)));
    }
  };
}

export function updateUnpublishedEntryStatus(
  collection: string,
  slug: string,
  oldStatus: WorkflowStatus,
  newStatus: WorkflowStatus,
) {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    if (oldStatus === newStatus) {
      return;
    }

    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);
    dispatch(unpublishedEntryStatusChangeRequest(collection, slug));
    backend
      .updateUnpublishedEntryStatus(collection, slug, newStatus)
      .then(() => {
        dispatch(
          addSnackbar({
            type: 'success',
            message: {
              key: 'ui.toast.entryUpdated',
            },
          }),
        );
        dispatch(unpublishedEntryStatusChangePersisted(collection, slug, newStatus));
      })
      .catch((error: Error) => {
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.onFailToUpdateStatus',
              options: {
                details: error,
              },
            },
          }),
        );
        dispatch(unpublishedEntryStatusChangeError(collection, slug));
      });
  };
}

export function deleteUnpublishedEntry(collection: string, slug: string) {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);
    dispatch(unpublishedEntryDeleteRequest(collection, slug));
    return backend
      .deleteUnpublishedEntry(collection, slug)
      .then(() => {
        dispatch(
          addSnackbar({
            type: 'success',
            message: {
              key: 'ui.toast.onDeleteUnpublishedChanges',
            },
          }),
        );
        dispatch(unpublishedEntryDeleted(collection, slug));
      })
      .catch((error: Error) => {
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.onDeleteUnpublishedChanges',
              options: {
                details: error,
              },
            },
          }),
        );
        dispatch(unpublishedEntryDeleteError(collection, slug));
      });
  };
}

export function publishUnpublishedEntry(
  collectionName: string,
  slug: string,
  navigate: NavigateFunction,
) {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const collections = state.collections;
    const backend = currentBackend(state.config.config);
    const entry = selectUnpublishedEntry(state, collectionName, slug);
    if (!entry) {
      return;
    }

    dispatch(unpublishedEntryPublishRequest(collectionName, slug));
    try {
      const collection = collections[collectionName];
      if (!collection) {
        return;
      }

      await backend.publishUnpublishedEntry(collection, entry);
      // re-load media after entry was published
      dispatch(loadMedia());
      dispatch(
        addSnackbar({
          type: 'success',
          message: {
            key: 'ui.toast.entryPublished',
          },
        }),
      );
      dispatch(unpublishedEntryPublished(collectionName, slug));
      if ('nested' in collection) {
        dispatch(loadEntries(collection));
        const newSlug = slugFromCustomPath(collection, entry.path);
        loadEntry(collection, newSlug);
        if (slug !== newSlug && selectEditingDraft(state)) {
          navigate(`/collections/${collection.name}/entries/${newSlug}`);
        }
      } else {
        return dispatch(loadEntry(collection, slug));
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          type: 'error',
          message: { key: 'ui.toast.onFailToPublishEntry', options: { details: error } },
        }),
      );
      dispatch(unpublishedEntryPublishError(collectionName, slug));
    }
  };
}

export function unpublishPublishedEntry(collection: Collection, slug: string) {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);
    const entry = selectEntry(state, collection.name, slug);
    if (!entry) {
      return;
    }

    const entryDraft: EntryDraft = { entry, fieldsErrors: {} };
    dispatch(unpublishedEntryPersisting(collection, slug));
    return backend
      .deleteEntry(state, collection, slug)
      .then(() =>
        backend.persistEntry({
          config: state.config.config as Config,
          collection,
          entryDraft,
          assetProxies: [],
          usedSlugs: [],
          rootSlug: slug,
          status: WorkflowStatus.PENDING_PUBLISH,
        }),
      )
      .then(async () => {
        dispatch(unpublishedEntryPersisted(collection, entry));
        dispatch(entryDeleted(collection, slug));
        await dispatch(loadUnpublishedEntry(collection, slug));
        dispatch(
          addSnackbar({
            type: 'success',
            message: {
              key: 'ui.toast.entryUnpublished',
            },
          }),
        );
      })
      .catch((error: Error) => {
        dispatch(
          addSnackbar({
            type: 'error',
            message: {
              key: 'ui.toast.onFailToUnpublishEntry',
              options: { details: error },
            },
          }),
        );
        dispatch(unpublishedEntryPersistedFail(error, collection, entry.slug));
      });
  };
}

export type EditorialWorkflowAction = ReturnType<
  | typeof unpublishedEntryLoading
  | typeof unpublishedEntryLoaded
  | typeof unpublishedEntryRedirected
  | typeof unpublishedEntriesLoading
  | typeof unpublishedEntriesLoaded
  | typeof unpublishedEntriesFailed
  | typeof unpublishedEntryPersisting
  | typeof unpublishedEntryPersisted
  | typeof unpublishedEntryPersistedFail
  | typeof unpublishedEntryStatusChangeRequest
  | typeof unpublishedEntryStatusChangePersisted
  | typeof unpublishedEntryStatusChangeError
  | typeof unpublishedEntryPublishRequest
  | typeof unpublishedEntryPublished
  | typeof unpublishedEntryPublishError
  | typeof unpublishedEntryDeleteRequest
  | typeof unpublishedEntryDeleted
  | typeof unpublishedEntryDeleteError
>;
