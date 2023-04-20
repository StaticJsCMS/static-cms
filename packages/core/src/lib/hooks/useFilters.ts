import { useMemo } from 'react';

import { selectEntriesFilter } from '@staticcms/core/reducers/selectors/entries';
import { useAppSelector } from '@staticcms/core/store/hooks';

export default function useFilters(collectionName: string) {
  const entriesFilterFieldSelector = useMemo(
    () => selectEntriesFilter(collectionName),
    [collectionName],
  );
  const filters = useAppSelector(entriesFilterFieldSelector);

  return useMemo(() => {
    return Object.values(filters ?? {}).filter(v => v?.active === true) || [];
  }, [filters]);
}
