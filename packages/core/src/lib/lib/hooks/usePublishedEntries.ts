import { useMemo } from 'react';

import {
  selectEntriesBySlugs,
  selectPublishedSlugs,
} from '@staticcms/core/reducers/selectors/entries';
import { useAppSelector } from '@staticcms/core/store/hooks';

export default function usePublishedEntries(collectionName: string) {
  const publishedSlugsSelector = useMemo(
    () => selectPublishedSlugs(collectionName),
    [collectionName],
  );

  const slugs = useAppSelector(publishedSlugsSelector);
  const entries = useAppSelector(selectEntriesBySlugs);

  return useMemo(
    () => slugs && slugs.map(slug => entries[`${collectionName}.${slug}`]),
    [collectionName, entries, slugs],
  );
}
