import { useMemo } from 'react';

import { getNewEntryUrl } from '../urlHelper';
import { isNotEmpty } from '../util/string.util';

import type { CollectionWithDefaults } from '@staticcms/core';

export default function useNewEntryUrl(
  collection: CollectionWithDefaults | undefined,
  filterTerm: string | undefined,
) {
  return useMemo(() => {
    if (!collection) {
      return undefined;
    }

    return 'fields' in collection && collection.create
      ? `${getNewEntryUrl(collection.name)}${isNotEmpty(filterTerm) ? `/${filterTerm}` : ''}`
      : '';
  }, [collection, filterTerm]);
}
