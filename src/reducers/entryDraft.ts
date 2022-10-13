import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';

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
  REMOVE_DRAFT_ENTRY_MEDIA_FILE,
} from '../actions/entries';
import { duplicateI18nFields, getDataPath } from '../lib/i18n';
import { set } from '../lib/util/object.util';

import type { EntriesAction } from '../actions/entries';
import type { Entry, FieldsErrors } from '../interface';

export interface EntryDraftState {
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
    case DRAFT_CREATE_FROM_ENTRY:
      // Existing Entry
      return {
        ...state,
        entry: {
          ...action.payload.entry,
          newRecord: false,
        },
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
        fieldsErrors: {},
        hasChanged: false,
        key: uuid(),
      };

    case DRAFT_CREATE_FROM_LOCAL_BACKUP: {
      const backupDraftEntry = state.localBackup;
      if (!backupDraftEntry) {
        return state;
      }

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
        fieldsErrors: {},
        hasChanged: true,
        key: uuid(),
      };
    }

    case DRAFT_CREATE_DUPLICATE_FROM_ENTRY:
      // Duplicate Entry
      return {
        ...state,
        entry: {
          ...action.payload,
          newRecord: true,
        },
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
      let newState = { ...state };
      if (!newState.entry) {
        return state;
      }

      const { field, value, entry, i18n } = action.payload;
      const name = field.name;
      const dataPath = (i18n && getDataPath(i18n.currentLocale, i18n.defaultLocale)) || ['data'];

      newState = {
        ...newState,
        entry: set(newState.entry, [...dataPath, name], value),
      };

      if (i18n) {
        newState = duplicateI18nFields(newState, field, i18n.locales, i18n.defaultLocale);
      }

      const newData = get(newState.entry, dataPath) ?? {};

      return {
        ...newState,
        hasChanged:
          !entry || !isEqual(newData, get(entry, dataPath)),
      };
    }

    case DRAFT_VALIDATION_ERRORS: {
      const fieldsErrors = { ...state.fieldsErrors };
      if (action.payload.errors.length === 0) {
        delete fieldsErrors[action.payload.uniqueFieldId];
      } else {
        fieldsErrors[action.payload.uniqueFieldId] = action.payload.errors;
      }
      return {
        ...state,
        fieldsErrors,
      };
    }

    case DRAFT_CLEAR_ERRORS: {
      return {
        ...state,
        fieldsErrors: {},
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

      return {
        ...state,
        hasChanged: false,
        entry: {
          ...state.entry,
          slug: action.payload.slug,
          isPersisting: false,
        },
      };
    }

    case ENTRY_DELETE_SUCCESS: {
      if (!state.entry) {
        return state;
      }

      return {
        ...state,
        hasChanged: false,
        entry: {
          ...state.entry,
          isPersisting: false,
        },
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
