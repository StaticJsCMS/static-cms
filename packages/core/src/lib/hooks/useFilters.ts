import { useMemo } from 'react';

import { selectEntriesSortField } from '@staticcms/core/reducers/selectors/entries';
import { useAppSelector } from '@staticcms/core/store/hooks';

export default function useFilters(collectionName: string) {
  const entriesSortFieldSelector = useMemo(
    () => selectEntriesSortField(collectionName),
    [collectionName],
  );
  const filters = useAppSelector(entriesSortFieldSelector);

  return useMemo(() => {
    return Object.values(filters ?? {}).filter(v => v?.active === true) || [];
  }, [filters]);
}
