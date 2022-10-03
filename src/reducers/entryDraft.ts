import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { Collection } from '..';
import { getIn, mergeDeep, setIn } from '../../lib/util/objectUtil';
import {
  ADD_DRAFT_ENTRY_MEDIA_FILE,
  DRAFT_CHANGE_FIELD,
  DRAFT_CLEAR_ERRORS,
  DRAFT_CREATE_DUPLICATE_FROM_ENTRY,
  DRAFT_CREATE_EMPTY,
  DRAFT_CREATE_FROM_ENTRY,
  DRAFT_CREATE_FROM_LOCAL_BACKUP,
  DRAFT_DISCARD,
  DRAFT_LOCAL_BACKUP_RETRIEVED,
  DRAFT_VALIDATION_ERRORS,
  ENTRY_DELETE_SUCCESS,
  ENTRY_PERSIST_FAILURE,
  ENTRY_PERSIST_REQUEST,
  ENTRY_PERSIST_SUCCESS,
  REMOVE_DRAFT_ENTRY_MEDIA_FILE
} from '../actions/entries';
import { duplicateI18nFields, getDataPath } from '../lib/i18n';
import { selectFolderEntryExtension, selectHasMetaPath } from './collections';

const initialState = {
  entry: {},
  fieldsMetaData: {},
  fieldsErrors: {},
  hasChanged: false,
  key: '',
};

export interface EntryDraftState {
  entry: Record<string, any>;
  fieldsMetaData: Record<string, any>;
  fieldsErrors: Record<string, any>;
  hasChanged: boolean;
  key: string;
  localBackup?: {
    entry: Record<string, any>;
  };
}

function entryDraftReducer(state: EntryDraftState = initialState, action: any) {
  switch (action.type) {
    case DRAFT_CREATE_FROM_ENTRY:
      // Existing Entry
      return {
        ...state,
        entry: {
          ...action.payload.entry,
          newRecord: false,
        },
        fieldsMetaData: {},
        fieldsErrors: {},
        hasChanged: false,
        key: uuid(),
      };
    case DRAFT_CREATE_EMPTY:
      // New Entry
      return {
        ...state,
        entry: {
          ...action.payload,
          newRecord: true,
        },
        fieldsMetaData: {},
        fieldsErrors: {},
        hasChanged: false,
        key: uuid(),
      };
    case DRAFT_CREATE_FROM_LOCAL_BACKUP:
      const backupDraftEntry = state.localBackup;
      const backupEntry = backupDraftEntry?.['entry'];

      const newState = { ...state };
      delete newState.localBackup;

      // Local Backup
      return {
        ...state,
        entry: {
          ...backupEntry,
          newRecord: !backupEntry?.path,
        },
        fieldsMetaData: {},
        fieldsErrors: {},
        hasChanged: true,
        key: uuid(),
      };
    case DRAFT_CREATE_DUPLICATE_FROM_ENTRY:
      // Duplicate Entry
      return {
        ...state,
        entry: {
          ...action.payload,
          newRecord: true,
        },
        mediaFiles: [],
        fieldsMetaData: {},
        fieldsErrors: {},
        hasChanged: true,
      };
    case DRAFT_DISCARD:
      return initialState;
    case DRAFT_LOCAL_BACKUP_RETRIEVED: {
      const { entry } = action.payload;
      const newState = {
        entry,
      };
      return {
        ...state,
        localBackup: newState,
      };
    }
    case DRAFT_CHANGE_FIELD: {
      const { field, value, metadata, entries, i18n } = action.payload;
      const name = field.name;
      const meta = field.meta;
      const dataPath = (i18n && getDataPath(i18n.currentLocale, i18n.defaultLocale)) || ['data'];

      const newState = { ...state };
      if (meta) {
        newState.entry = {
          ...newState.entry,
          meta: {
            ...newState.entry.meta,
            [name]: value,
          },
        };
      } else {
        setIn(newState.entry, ['entry', ...dataPath, name], value);
        if (i18n) {
          state = duplicateI18nFields(state, field, i18n.locales, i18n.defaultLocale);
        }
      }

      const fieldsMetaData = mergeDeep({ ...state.fieldsMetaData }, metadata);
      const newData = getIn(state.entry, dataPath) ?? {};
      const newMeta = state.entry.meta;

      return {
        ...state,
        fieldsMetaData,
        hasChanged:
          !entries.find((e: any) => newData === getIn(e, dataPath)) ||
          !entries.find((e: any) => newMeta === e.meta),
      };
    }
    case DRAFT_VALIDATION_ERRORS:
      const fieldErrors = { ...state.fieldsErrors };
      if (action.payload.errors.length === 0) {
        delete fieldErrors[action.payload.uniquefieldId];
      } else {
        fieldErrors[action.payload.uniquefieldId] = action.payload.errors;
      }
      return {
        ...state,
        fieldErrors,
      };

    case DRAFT_CLEAR_ERRORS: {
      return {
        ...state,
        fieldsErrors: {},
      };
    }

    case ENTRY_PERSIST_REQUEST: {
      return {
        ...state,
        entry: {
          ...state.entry,
          isPersisting: true,
        },
      };
    }

    case ENTRY_PERSIST_FAILURE: {
      return {
        ...state,
        entry: {
          ...state.entry,
          isPersisting: false,
        },
      };
    }

    case ENTRY_PERSIST_SUCCESS:
      return {
        ...state,
        hasChanged: false,
        entry: {
          ...state.entry,
          slug: action.payload.slug,
          isPersisting: false,
        },
      };

    case ENTRY_DELETE_SUCCESS:
      return {
        ...state,
        hasChanged: false,
        entry: {
          ...state.entry,
          isPersisting: false,
        },
      };

    case ADD_DRAFT_ENTRY_MEDIA_FILE: {
      const mediaFiles = state.entry.mediaFiles.filter(
        (file: any) => file.id !== action.payload.id,
      );
      mediaFiles.unshift(action.payload);

      return {
        ...state,
        hasChanged: true,
        entry: {
          ...state.entry,
          mediaFiles,
        },
      };
    }

    case REMOVE_DRAFT_ENTRY_MEDIA_FILE: {
      const mediaFiles = state.entry.mediaFiles.filter(
        (file: any) => file.id !== action.payload.id,
      );

      return {
        ...state,
        hasChanged: true,
        entry: {
          ...state.entry,
          mediaFiles,
        },
      };
    }

    default:
      return state;
  }
}

export function selectCustomPath(
  collection: Collection,
  entryDraft: { entry: { meta?: { path?: string } } },
) {
  if (!selectHasMetaPath(collection)) {
    return;
  }
  const meta = entryDraft.entry.meta;
  const path = meta && meta.path;
  const indexFile = collection.meta?.path?.index_file;
  const extension = selectFolderEntryExtension(collection);
  const customPath = path && join(collection.folder, path, `${indexFile}.${extension}`);
  return customPath;
}

export default entryDraftReducer;
