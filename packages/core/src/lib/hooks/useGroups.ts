import groupBy from 'lodash/groupBy';
import { useMemo } from 'react';

import { getGroup, selectEntriesGroupField } from '@staticcms/core/reducers/selectors/entries';
import { useAppSelector } from '@staticcms/core/store/hooks';
import usePublishedEntries from './usePublishedEntries';

import type { GroupOfEntries } from '@staticcms/core/interface';

export default function useGroups(collectionName: string) {
  const entries = usePublishedEntries(collectionName);

  const entriesGroupFieldSelector = useMemo(
    () => selectEntriesGroupField(collectionName),
    [collectionName],
  );
  const selectedGroup = useAppSelector(entriesGroupFieldSelector);

  return useMemo(() => {
    if (selectedGroup === undefined) {
      return [];
    }

    let groups: Record<string, { id: string; label: string; value: string | boolean | undefined }> =
      {};
    const groupedEntries = groupBy(entries, entry => {
      const group = getGroup(entry, selectedGroup);
      groups = { ...groups, [group.id]: group };
      return group.id;
    });

    const groupsArray: GroupOfEntries[] = Object.entries(groupedEntries).map(([id, entries]) => {
      return {
        ...groups[id],
        paths: new Set(entries.map(entry => entry.path)),
      };
    });

    return groupsArray;
  }, [entries, selectedGroup]);
}
