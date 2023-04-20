import { basename, dirname } from 'path';
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
  MEDIA_LIBRARY_OPEN,
  MEDIA_LOAD_FAILURE,
  MEDIA_LOAD_REQUEST,
  MEDIA_LOAD_SUCCESS,
  MEDIA_PERSIST_FAILURE,
  MEDIA_PERSIST_REQUEST,
  MEDIA_PERSIST_SUCCESS,
  MEDIA_REMOVE_INSERTED,
} from '../constants';

import type { MediaLibraryAction } from '../actions/mediaLibrary';
import type {
  Collection,
  CollectionFile,
  MediaField,
  MediaFile,
  MediaLibrarInsertOptions,
  MediaLibraryConfig,
  MediaLibraryDisplayURL,
  MediaPath,
} from '../interface';

export type MediaLibraryState = {
  isVisible: boolean;
  showMediaButton: boolean;
  controlMedia: Record<string, MediaPath>;
  displayURLs: Record<string, MediaLibraryDisplayURL>;
  controlID?: string;
  page?: number;
  files?: MediaFile[];
  config?: MediaLibraryConfig;
  collection?: Collection;
  collectionFile?: CollectionFile;
  field?: MediaField;
  value?: string | string[];
  alt?: string;
  replaceIndex?: number;
  isLoading?: boolean;
  dynamicSearch?: boolean;
  dynamicSearchActive?: boolean;
  dynamicSearchQuery?: string;
  forImage?: boolean;
  forFolder?: boolean;
  isPersisting?: boolean;
  isDeleting?: boolean;
  hasNextPage?: boolean;
  isPaginating?: boolean;
  insertOptions?: MediaLibrarInsertOptions;
};

const defaultState: MediaLibraryState = {
  isVisible: false,
  showMediaButton: true,
  controlMedia: {},
  displayURLs: {},
};

function mediaLibrary(
  state: MediaLibraryState = defaultState,
  action: MediaLibraryAction,
): MediaLibraryState {
  switch (action.type) {
    case MEDIA_LIBRARY_OPEN: {
      const {
        controlID,
        forImage,
        forFolder,
        config,
        collection,
        collectionFile,
        field,
        value,
        alt,
        replaceIndex,
        insertOptions,
      } = action.payload;
      const libConfig = config || {};

      return {
        ...state,
        isVisible: true,
        forImage: Boolean(forImage),
        forFolder: Boolean(forFolder),
        controlID,
        config: libConfig,
        collection,
        collectionFile,
        field,
        value,
        alt,
        replaceIndex,
        insertOptions,
      };
    }

    case MEDIA_LIBRARY_CLOSE:
      return {
        ...state,
        isVisible: false,
        insertOptions: undefined,
        alt: undefined,
      };

    case MEDIA_INSERT: {
      const { mediaPath, alt } = action.payload;
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
            [controlID]: {
              path: mediaPath,
              alt,
            },
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
          [controlID]: {
            path: valueArray,
          },
        },
      };
    }

    case MEDIA_REMOVE_INSERTED: {
      const controlID = action.payload.controlID;

      const newControlMedia = { ...state.controlMedia };
      delete newControlMedia[controlID];

      return {
        ...state,
        controlMedia: newControlMedia,
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
      const { file, currentFolder } = action.payload;
      const fileWithKey = { ...file, key: uuid() };
      const files = state.files as MediaFile[];

      const dir = dirname(file.path);
      if (!currentFolder || dir === currentFolder) {
        const updatedFiles: MediaFile[] = [fileWithKey, ...files];
        return {
          ...state,
          files: updatedFiles,
          isPersisting: false,
        };
      }

      const folder = files.find(otherFile => otherFile.isDirectory && otherFile.path === dir);
      if (!folder) {
        const updatedFiles: MediaFile[] = [
          {
            name: basename(dir),
            id: dir,
            path: dir,
            isDirectory: true,
          },
          ...files,
        ];

        return {
          ...state,
          files: updatedFiles,
          isPersisting: false,
        };
      }

      return {
        ...state,
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

export default mediaLibrary;
