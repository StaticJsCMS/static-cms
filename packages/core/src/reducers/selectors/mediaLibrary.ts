import { createSelector } from '@reduxjs/toolkit';
import get from 'lodash/get';
import { dirname } from 'path';

import { selectMediaFolder } from '@staticcms/core/lib/util/media.util';
import { selectEntryDraft } from './entryDraft';
import { selectConfig } from './config';
import { selectCollections } from './collections';

import type { DisplayURLState, MediaField, MediaFile } from '@staticcms/core';
import type { RootState } from '@staticcms/core/store';

export const selectMediaLibraryState = (state: RootState) => {
  return state.mediaLibrary;
};

export const selectMediaFiles = createSelector(
  [
    selectMediaLibraryState,
    selectEntryDraft,
    selectCollections,
    selectConfig,
    (_state: RootState, field?: MediaField) => field,
  ],
  (mediaLibrary, entryDraft, collections, config, field) => {
    const editingDraft = entryDraft.entry;

    let files: MediaFile[] = [];
    if (editingDraft) {
      const entryFiles = entryDraft?.entry?.mediaFiles ?? [];
      const entry = entryDraft['entry'];
      const collection = entry?.collection ? collections[entry.collection] : null;
      if (config) {
        const mediaFolder = selectMediaFolder(config, collection, entry, field);
        files = entryFiles
          .filter(f => dirname(f.path) === mediaFolder)
          .map(file => ({ key: file.id, ...file }));
      }
    } else {
      files = mediaLibrary.files || [];
    }

    return files;
  },
);

export const selectMediaLibraryFiles = (state: RootState) => {
  return state.mediaLibrary.files;
};

export const selectMediaDisplayURL = createSelector(
  [selectMediaLibraryState, (_state: RootState, id: string) => id],
  (mediaLibrary, id) => {
    return (get(mediaLibrary, ['displayURLs', id]) ?? {}) as DisplayURLState;
  },
);

export const selectMediaPath = (state: RootState, controlID: string) => {
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
