import { getDataPath } from '@staticcms/core/lib/i18n';

import type { I18nSettings } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export const selectFieldErrors =
  (path: string, i18n: I18nSettings | undefined) => (state: RootState) => {
    const dataPath = (i18n && getDataPath(i18n.currentLocale, i18n.defaultLocale)) || ['data'];
    const fullPath = `${dataPath.join('.')}.${path}`;
    return state.entryDraft.fieldsErrors[fullPath] ?? [];
  };

export function selectEditingDraft(state: RootState) {
  return state.entryDraft.entry;
}
