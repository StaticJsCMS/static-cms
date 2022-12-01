import get from 'lodash/get';
import { dirname } from 'path';
import { v4 as uuid } from 'uuid';

import {
  MEDIA_DELETE_FAILURE,
  MEDIA_DELETE_REQUEST,
  MEDIA_DELETE_SUCCESS,
  MEDIA_DISPLAY_URL_FAILURE,
  MEDIA_DISPLAY_URL_REQUEST,
  MEDIA_DISPLAY_URL_SUCCESS,
  MEDIA_INSERT,
  MEDIA_LIBRARY_CLOSE,
  MEDIA_LIBRARY_CREATE,
  MEDIA_LIBRARY_OPEN,
  MEDIA_LOAD_FAILURE,
  MEDIA_LOAD_REQUEST,
  MEDIA_LOAD_SUCCESS,
  MEDIA_PERSIST_FAILURE,
  MEDIA_PERSIST_REQUEST,
  MEDIA_PERSIST_SUCCESS,
  MEDIA_REMOVE_INSERTED,
} from '../actions/mediaLibrary';
import { selectMediaFolder } from '../lib/util/media.util';
import { selectEditingDraft } from './entries';

import type { MediaLibraryAction } from '../actions/mediaLibrary';
import type { DisplayURLState, Field, MediaFile, MediaLibraryInstance } from '../interface';
import type { RootState } from '../store';

export interface MediaLibraryDisplayURL {
  url?: string;
  isFetching: boolean;
  err?: unknown;
}

export type MediaLibraryState = {
  isVisible: boolean;
  showMediaButton: boolean;
  controlMedia: Record<string, string | string[]>;
  displayURLs: Record<string, MediaLibraryDisplayURL>;
  externalLibrary?: MediaLibraryInstance;
  controlID?: string;
  page?: number;
  files?: MediaFile[];
  config: Record<string, unknown>;
  field?: Field;
  value?: string | string[];
  replaceIndex?: number;
  canInsert?: boolean;
  isLoading?: boolean;
  dynamicSearch?: boolean;
  dynamicSearchActive?: boolean;
  dynamicSearchQuery?: string;
  forImage?: boolean;
  isPersisting?: boolean;
  isDeleting?: boolean;
  hasNextPage?: boolean;
  isPaginating?: boolean;
};

const defaultState: MediaLibraryState = {
  isVisible: false,
  showMediaButton: true,
  controlMedia: {},
  displayURLs: {},
  config: {},
};

function mediaLibrary(
  state: MediaLibraryState = defaultState,
  action: MediaLibraryAction,
): MediaLibraryState {
  switch (action.type) {
    case MEDIA_LIBRARY_CREATE:
      return {
        ...state,
        externalLibrary: action.payload,
        showMediaButton: action.payload.enableStandalone(),
      };

    case MEDIA_LIBRARY_OPEN: {
      const { controlID, forImage, config, field, value, replaceIndex } = action.payload;
      const libConfig = config || {};

      return {
        ...state,
        isVisible: true,
        forImage: Boolean(forImage),
        controlID,
        canInsert: !!controlID,
        config: libConfig,
        field,
        value,
        replaceIndex,
      };
    }

    case MEDIA_LIBRARY_CLOSE:
      return {
        ...state,
        isVisible: false,
      };

    case MEDIA_INSERT: {
      const { mediaPath } = action.payload;
      const controlID = state.controlID;
      if (!controlID) {
        return state;
      }

      const value = state.value;

      if (!Array.isArray(value)) {
        return {
          ...state,
          controlMedia: {
            ...state.controlMedia,
            [controlID]: mediaPath,
          },
        };
      }

      const replaceIndex = state.replaceIndex;
      const mediaArray = Array.isArray(mediaPath) ? mediaPath : [mediaPath];
      const valueArray = value as string[];
      if (typeof replaceIndex == 'number') {
        valueArray[replaceIndex] = mediaArray[0];
      } else {
        valueArray.push(...mediaArray);
      }

      return {
        ...state,
        controlMedia: {
          ...state.controlMedia,
          [controlID]: valueArray,
        },
      };
    }

    case MEDIA_REMOVE_INSERTED: {
      const controlID = action.payload.controlID;

      return {
        ...state,
        controlMedia: {
          ...state.controlMedia,
          [controlID]: '',
        },
      };
    }

    case MEDIA_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isPaginating: action.payload.page > 1,
      };

    case MEDIA_LOAD_SUCCESS: {
      const { files = [], page, canPaginate, dynamicSearch, dynamicSearchQuery } = action.payload;

      const filesWithKeys = files.map(file => ({ ...file, key: uuid() }));
      return {
        ...state,
        isLoading: false,
        isPaginating: false,
        page: page ?? 1,
        hasNextPage: Boolean(canPaginate && files.length > 0),
        dynamicSearch: Boolean(dynamicSearch),
        dynamicSearchQuery: dynamicSearchQuery ?? '',
        dynamicSearchActive: !!dynamicSearchQuery,
        files:
          page && page > 1 ? (state.files as MediaFile[]).concat(filesWithKeys) : filesWithKeys,
      };
    }

    case MEDIA_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case MEDIA_PERSIST_REQUEST:
      return {
        ...state,
        isPersisting: true,
      };

    case MEDIA_PERSIST_SUCCESS: {
      const { file } = action.payload;
      const fileWithKey = { ...file, key: uuid() };
      const files = state.files as MediaFile[];
      const updatedFiles = [fileWithKey, ...files];
      return {
        ...state,
        files: updatedFiles,
        isPersisting: false,
      };
    }

    case MEDIA_PERSIST_FAILURE: {
      return {
        ...state,
        isPersisting: false,
      };
    }

    case MEDIA_DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };

    case MEDIA_DELETE_SUCCESS: {
      const { file } = action.payload;
      const { key, id } = file;

      const files = state.files as MediaFile[];
      const updatedFiles = files.filter(file => (key ? file.key !== key : file.id !== id));

      const displayURLs = {
        ...state.displayURLs,
      };

      delete displayURLs[id];

      return {
        ...state,
        files: updatedFiles,
        displayURLs,
        isDeleting: false,
      };
    }

    case MEDIA_DELETE_FAILURE: {
      return {
        ...state,
        isDeleting: false,
      };
    }

    case MEDIA_DISPLAY_URL_REQUEST:
      return {
        ...state,
        displayURLs: {
          ...state.displayURLs,
          [action.payload.key]: {
            ...state.displayURLs[action.payload.key],
            isFetching: true,
          },
        },
      };

    case MEDIA_DISPLAY_URL_SUCCESS: {
      return {
        ...state,
        displayURLs: {
          ...state.displayURLs,
          [action.payload.key]: {
            url: action.payload.url,
            isFetching: false,
          },
        },
      };
    }

    case MEDIA_DISPLAY_URL_FAILURE: {
      const displayUrl = { ...state.displayURLs[action.payload.key] };
      delete displayUrl.url;
      displayUrl.isFetching = false;
      displayUrl.err = action.payload.err ?? true;

      return {
        ...state,
        displayURLs: {
          ...state.displayURLs,
          [action.payload.key]: displayUrl,
        },
      };
    }

    default:
      return state;
  }
}

export function selectMediaFiles(state: RootState, field?: Field): MediaFile[] {
  const { mediaLibrary, entryDraft } = state;
  const editingDraft = selectEditingDraft(entryDraft);

  let files: MediaFile[] = [];
  if (editingDraft) {
    const entryFiles = entryDraft?.entry?.mediaFiles ?? [];
    const entry = entryDraft['entry'];
    const collection = entry?.collection ? state.collections[entry.collection] : null;
    if (state.config.config) {
      const mediaFolder = selectMediaFolder(state.config.config, collection, entry, field);
      files = entryFiles
        .filter(f => dirname(f.path) === mediaFolder)
        .map(file => ({ key: file.id, ...file }));
    }
  } else {
    files = mediaLibrary.files || [];
  }

  return files;
}

export function selectMediaFileByPath(state: RootState, path: string) {
  const files = selectMediaFiles(state);
  const file = files.find(file => file.path === path);
  return file;
}

export function selectMediaDisplayURL(state: RootState, id: string) {
  const displayUrlState = (get(state.mediaLibrary, ['displayURLs', id]) ?? {}) as DisplayURLState;
  return displayUrlState;
}

export const selectMediaPath = (controlID: string) => (state: RootState) => {
  return state.mediaLibrary.controlMedia[controlID];
};

export default mediaLibrary;
