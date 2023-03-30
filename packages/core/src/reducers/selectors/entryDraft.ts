import { getDataPath } from '@staticcms/core/lib/i18n';

import type { I18nSettings } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export const getEntryDataPath = (i18n: I18nSettings | undefined) => {
  return (i18n && getDataPath(i18n.currentLocale, i18n.defaultLocale)) || ['data'];
};

export const selectFieldErrors =
  (path: string, i18n: I18nSettings | undefined) => (state: RootState) => {
    const dataPath = getEntryDataPath(i18n);
    const fullPath = `${dataPath.join('.')}.${path}`;
    return state.entryDraft.fieldsErrors[fullPath] ?? [];
  };

export function selectEditingDraft(state: RootState) {
  return state.entryDraft.entry;
}

export function selectDraftMediaFiles(state: RootState) {
  return state.entryDraft.entry?.mediaFiles;
}
