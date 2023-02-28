import get from 'lodash/get';
import { dirname } from 'path';

import { selectMediaFolder } from '@staticcms/core/lib/util/media.util';
import { selectEditingDraft } from './entryDraft';

import type { DisplayURLState, Field, MediaFile } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export function selectMediaFiles(state: RootState, field?: Field): MediaFile[] {
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
}

export function selectMediaFileByPath(state: RootState, path: string) {
  const files = selectMediaFiles(state);
  const file = files.find(file => file.path === path);
  return file;
}

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
