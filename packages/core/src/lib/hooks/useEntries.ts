import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { useMemo } from 'react';

import { SORT_DIRECTION_ASCENDING } from '@staticcms/core/constants';
import { selectEntriesSortField } from '@staticcms/core/reducers/selectors/entries';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { selectSortDataPath } from '../util/sort.util';
import useFilters from './useFilters';
import usePublishedEntries from './usePublishedEntries';
import useUnpublishedEntries from './useUnpublishedEntries';

import type { CollectionWithDefaults } from '@staticcms/core/interface';

export default function useEntries(collection: CollectionWithDefaults) {
  const publishedEntries = usePublishedEntries(collection.name);
  const unpublishedEntries = useUnpublishedEntries(collection.name);

  const filteredPublishedEntries = useMemo(
    () => publishedEntries.filter(entry => !unpublishedEntries.find(e => e.slug === entry.slug)),
    [publishedEntries, unpublishedEntries],
  );

  const entriesSortFieldSelector = useMemo(
    () => selectEntriesSortField(collection.name),
    [collection.name],
  );
  const sortField = useAppSelector(entriesSortFieldSelector);

  const filters = useFilters(collection.name);

  return useMemo(() => {
    let finalEntries = [...unpublishedEntries, ...filteredPublishedEntries];

    if (sortField) {
      const key = selectSortDataPath(collection, sortField.key);
      const order = sortField.direction === SORT_DIRECTION_ASCENDING ? 'asc' : 'desc';
      finalEntries = orderBy(finalEntries, key, order);
    }

    if (filters && filters.length > 0) {
      finalEntries = finalEntries.filter(e => {
        const allMatched = filters.every(f => {
          const pattern = f.pattern;
          const field = f.field;
          const data = e.data || {};
          const toMatch = get(data, field);
          const matched =
            toMatch !== undefined && new RegExp(String(pattern)).test(String(toMatch));
          return matched;
        });
        return allMatched;
      });
    }

    return finalEntries;
  }, [collection, filters, filteredPublishedEntries, sortField, unpublishedEntries]);
}
