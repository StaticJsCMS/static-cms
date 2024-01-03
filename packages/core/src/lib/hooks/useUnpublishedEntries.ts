import { useMemo } from 'react';

import { selectUnpublishedEntries } from '@staticcms/core/reducers/selectors/editorialWorkflow';
import { useAppSelector } from '@staticcms/core/store/hooks';

export default function useUnpublishedEntries(collectionName: string, onlyNew = false) {
  const allEntries = useAppSelector(selectUnpublishedEntries);

  return useMemo(
    () =>
      Object.values(allEntries).filter(
        e => e.collection === collectionName && (!onlyNew || !e.isModification),
      ),
    [allEntries, collectionName, onlyNew],
  );
}
