import { useMemo } from 'react';

import { getEntryDataPath } from '@staticcms/core/reducers/selectors/entryDraft';

import type { FieldsErrors, I18nSettings } from '@staticcms/core/interface';

export default function useHasChildErrors(
  path: string,
  fieldsErrors: FieldsErrors,
  i18n: I18nSettings | undefined,
  isMeta: boolean | undefined,
) {
  return useMemo(() => {
    const dataPath = getEntryDataPath(i18n, isMeta);
    const fullPath = `${dataPath}.${path}`;

    return Boolean(Object.keys(fieldsErrors).find(key => key.startsWith(fullPath)));
  }, [fieldsErrors, i18n, isMeta, path]);
}
