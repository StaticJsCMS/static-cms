import get from 'lodash/get';
import { dirname } from 'path';

import { selectMediaFolder } from '@staticcms/core/lib/util/media.util';
import { selectEditingDraft } from './entryDraft';

import type { DisplayURLState, MediaField, MediaFile } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export const selectMediaFiles =
  (field?: MediaField) =>
  (state: RootState): MediaFile[] => {
    const { mediaLibrary, entryDraft } = state;
    const editingDraft = selectEditingDraft(state);

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
  };

export const selectMediaLibraryState = (state: RootState) => {
  return state.mediaLibrary;
};

export const selectMediaLibraryFiles = (state: RootState) => {
  return state.mediaLibrary.files;
};

export function selectMediaDisplayURL(state: RootState, id: string) {
  return (get(state.mediaLibrary, ['displayURLs', id]) ?? {}) as DisplayURLState;
}

export const selectMediaPath = (controlID: string) => (state: RootState) => {
  return state.mediaLibrary.controlMedia[controlID];
};

export const selectPersisting = (state: RootState) => {
  return state.mediaLibrary.isPersisting;
};

export const selectDeleting = (state: RootState) => {
  return state.mediaLibrary.isDeleting;
};

export const selectVisible = (state: RootState) => {
  return state.mediaLibrary.isVisible;
};
