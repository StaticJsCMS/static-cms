import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';

import {
  ADD_DRAFT_ENTRY_MEDIA_FILE,
  DRAFT_CHANGE_FIELD,
  DRAFT_CREATE_DUPLICATE_FROM_ENTRY,
  DRAFT_CREATE_EMPTY,
  DRAFT_CREATE_FROM_ENTRY,
  DRAFT_CREATE_FROM_LOCAL_BACKUP,
  DRAFT_DISCARD,
  DRAFT_LOCAL_BACKUP_DELETE,
  DRAFT_LOCAL_BACKUP_RETRIEVED,
  DRAFT_VALIDATION_ERRORS,
  ENTRY_DELETE_SUCCESS,
  ENTRY_PERSIST_FAILURE,
  ENTRY_PERSIST_REQUEST,
  ENTRY_PERSIST_SUCCESS,
  REMOVE_DRAFT_ENTRY_MEDIA_FILE,
} from '../actions/entries';
import { duplicateI18nFields, getDataPath } from '../lib/i18n';
import { set } from '../lib/util/object.util';

import type { EntriesAction } from '../actions/entries';
import type { Entry, FieldsErrors } from '../interface';

export interface EntryDraftState {
  original?: Entry;
  entry?: Entry;
  fieldsErrors: FieldsErrors;
  hasChanged: boolean;
  key: string;
  localBackup?: {
    entry: Entry;
  };
}

const initialState: EntryDraftState = {
  fieldsErrors: {},
  hasChanged: false,
  key: '',
};

function entryDraftReducer(
  state: EntryDraftState = initialState,
  action: EntriesAction,
): EntryDraftState {
  switch (action.type) {
    case DRAFT_CREATE_FROM_ENTRY: {
      const newState = { ...state };

      const entry: Entry = {
        ...action.payload.entry,
        newRecord: false,
      };

      // Existing Entry
      return {
        ...newState,
        entry,
        original: entry,
        fieldsErrors: {},
        hasChanged: false,
        key: uuid(),
      };
    }
    case DRAFT_CREATE_EMPTY: {
      const newState = { ...state };
      delete newState.localBackup;

      const entry: Entry = {
        ...action.payload,
        newRecord: true,
      };

      // New Entry
      return {
        ...newState,
        entry,
        original: entry,
        fieldsErrors: {},
        hasChanged: false,
        key: uuid(),
      };
    }
    case DRAFT_CREATE_FROM_LOCAL_BACKUP: {
      const backupDraftEntry = state.localBackup;
      if (!backupDraftEntry) {
        return state;
      }

      const backupEntry = backupDraftEntry?.['entry'];

      const newState = { ...state };
      delete newState.localBackup;

      const entry: Entry = {
        ...backupEntry,
        newRecord: !backupEntry?.path,
      };

      // Local Backup
      return {
        ...state,
        entry,
        original: entry,
        fieldsErrors: {},
        hasChanged: true,
        key: uuid(),
      };
    }

    case DRAFT_CREATE_DUPLICATE_FROM_ENTRY: {
      const newState = { ...state };
      delete newState.localBackup;

      const entry: Entry = {
        ...action.payload,
        newRecord: true,
      };

      // Duplicate Entry
      return {
        ...newState,
        entry,
        original: entry,
        fieldsErrors: {},
        hasChanged: true,
      };
    }
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

    case DRAFT_LOCAL_BACKUP_DELETE: {
      const newState = { ...state };
      delete newState.localBackup;
      return newState;
    }

    case DRAFT_CHANGE_FIELD: {
      let newState = { ...state };
      if (!newState.entry) {
        return state;
      }

      const { path, field, value, entry, i18n } = action.payload;
      const dataPath = (i18n && getDataPath(i18n.currentLocale, i18n.defaultLocale)) || ['data'];

      newState = {
        ...newState,
        entry: set(newState.entry, `${dataPath.join('.')}.${path}`, value),
      };

      if (i18n) {
        newState = duplicateI18nFields(newState, field, i18n.locales, i18n.defaultLocale);
      }

      const newData = get(newState.entry, dataPath) ?? {};

      return {
        ...newState,
        hasChanged: !entry || !isEqual(newData, get(newState.original, dataPath)),
      };
    }

    case DRAFT_VALIDATION_ERRORS: {
      const { path, errors } = action.payload;
      const fieldsErrors = { ...state.fieldsErrors };
      if (errors.length === 0) {
        delete fieldsErrors[path];
      } else {
        fieldsErrors[path] = action.payload.errors;
      }
      return {
        ...state,
        fieldsErrors,
      };
    }

    case ENTRY_PERSIST_REQUEST: {
      if (!state.entry) {
        return state;
      }

      return {
        ...state,
        entry: {
          ...state.entry,
          isPersisting: true,
        },
      };
    }

    case ENTRY_PERSIST_FAILURE: {
      if (!state.entry) {
        return state;
      }

      return {
        ...state,
        entry: {
          ...state.entry,
          isPersisting: false,
        },
      };
    }

    case ENTRY_PERSIST_SUCCESS: {
      if (!state.entry) {
        return state;
      }

      const newState = { ...state };
      delete newState.localBackup;

      const entry: Entry = {
        ...state.entry,
        slug: action.payload.slug,
        isPersisting: false,
      };

      return {
        ...newState,
        hasChanged: false,
        entry,
        original: entry,
      };
    }

    case ENTRY_DELETE_SUCCESS: {
      if (!state.entry) {
        return state;
      }

      const newState = { ...state };
      delete newState.localBackup;

      const entry: Entry = {
        ...state.entry,
        isPersisting: false,
      };

      return {
        ...newState,
        hasChanged: false,
        entry,
        original: entry
      };
    }

    case ADD_DRAFT_ENTRY_MEDIA_FILE: {
      if (!state.entry) {
        return state;
      }

      const mediaFiles = state.entry.mediaFiles.filter(file => file.id !== action.payload.id);
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
      if (!state.entry) {
        return state;
      }

      const mediaFiles = state.entry.mediaFiles.filter(file => file.id !== action.payload.id);

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

export default entryDraftReducer;
