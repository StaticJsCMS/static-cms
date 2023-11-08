import { createSelector } from '@reduxjs/toolkit';

import { getDataPath } from '@staticcms/core/lib/i18n';

import type { I18nSettings } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export const getEntryDataPath = (i18n: I18nSettings | undefined, isMeta: boolean | undefined) => {
  return isMeta
    ? ['meta']
    : (i18n && getDataPath(i18n.currentLocale, i18n.defaultLocale)) || ['data'];
};

export const selectAllFieldErrors = (state: RootState) => state.entryDraft.fieldsErrors;

export const selectFieldErrors = createSelector(
  [
    selectAllFieldErrors,
    (_state: RootState, path: string) => path,
    (_state: RootState, _path: string, i18n: I18nSettings | undefined) => i18n,
    (
      _state: RootState,
      _path: string,
      _i18n: I18nSettings | undefined,
      isMeta: boolean | undefined,
    ) => isMeta,
  ],
  (fieldsErrors, path, i18n, isMeta) => {
    const dataPath = getEntryDataPath(i18n, isMeta);
    const fullPath = `${dataPath.join('.')}.${path}`;
    return fieldsErrors[fullPath] ?? [];
  },
);

export function selectEntryDraft(state: RootState) {
  return state.entryDraft;
}

export function selectEditingDraft(state: RootState) {
  return state.entryDraft.entry;
}

export function selectDraftMediaFiles(state: RootState) {
  return state.entryDraft.entry?.mediaFiles;
}
