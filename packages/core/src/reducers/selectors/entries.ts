import { createSelector } from '@reduxjs/toolkit';
import get from 'lodash/get';

import { SORT_DIRECTION_NONE } from '@staticcms/core/constants';
import { filterNullish } from '@staticcms/core/lib/util/null.util';

import type {
  Entries,
  Entry,
  GroupMap,
  ObjectValue,
  Page,
  SortMap,
  SortObject,
} from '@staticcms/core';
import type { ViewStyle } from '@staticcms/core/constants/views';
import type { RootState } from '@staticcms/core/store';

export const selectEntriesFilters = (entries: RootState) => {
  return entries.entries.filter;
};

export const selectEntriesFilter = createSelector(
  [selectEntriesFilters, (_state: RootState, collectionName?: string) => collectionName],
  (filters, collectionName) => {
    if (!collectionName) {
      return {};
    }

    return filters?.[collectionName] ?? {};
  },
);

export const selectEntriesGroups = (entries: RootState) => {
  return entries.entries.group;
};

export const selectEntriesGroup = createSelector(
  [selectEntriesGroups, (_state: RootState, collectionName?: string) => collectionName],
  (group, collectionName): Record<string, GroupMap> => {
    if (!collectionName) {
      return {};
    }

    return group?.[collectionName] ?? {};
  },
);

export const selectEntriesSelectedGroup = createSelector(
  [selectEntriesGroup],
  (groupLookup): GroupMap | undefined => {
    return Object.values(groupLookup).find(v => v?.active === true);
  },
);

export const selectEntriesSorts = (entries: RootState) => {
  return entries.entries.sort;
};

export const selectEntriesSort = createSelector(
  [selectEntriesSorts, (_state: RootState, collectionName?: string) => collectionName],
  (sort, collectionName): SortMap => {
    if (!collectionName) {
      return {};
    }

    return sort[collectionName] ?? {};
  },
);

export const selectEntriesSelectedSort = createSelector(
  [selectEntriesSort],
  (sortLookup): SortObject | undefined => {
    return Object.values(sortLookup).find(v => v?.direction !== SORT_DIRECTION_NONE);
  },
);

export function selectViewStyle(entries: RootState): ViewStyle {
  return entries.entries.viewStyle;
}

export function selectEntriesBySlugs(state: RootState) {
  return state.entries.entries;
}

function getEntry(entries: Entries, collectionName: string, slug: string) {
  return entries[`${collectionName}.${slug}`];
}

export const selectEntry = createSelector(
  [
    selectEntriesBySlugs,
    (_state: RootState, collectionName: string) => collectionName,
    (_state: RootState, _collectionName: string, slug: string | undefined) => slug,
  ],
  (entries, collectionName, slug): Entry<ObjectValue> | null => {
    if (!slug) {
      return null;
    }

    return getEntry(entries, collectionName, slug);
  },
);

export const selectEntryPages = (state: RootState) => {
  return state.entries.pages;
};

export const selectEntryPage = (state: RootState, collectionName: string) => {
  return state.entries.pages[collectionName];
};

export const selectPublishedSlugs = createSelector([selectEntryPage], (page: Page): string[] => {
  return page?.ids ?? [];
});

export const selectPublishedEntries = createSelector(
  [
    selectEntriesBySlugs,
    (_state: RootState, collectionName: string) => collectionName,
    selectPublishedSlugs,
  ],
  (entries, collectionName, slugs): Entry<ObjectValue>[] => {
    return slugs.map(slug => getEntry(entries, collectionName, slug));
  },
);

export function getGroup(entry: Entry, selectedGroup: GroupMap) {
  const label = selectedGroup.label;
  const field = selectedGroup.field;

  const fieldData = get(entry.data, field);
  if (fieldData === undefined) {
    return {
      id: 'missing_value',
      label,
      value: fieldData,
    };
  }

  const dataAsString = String(fieldData);
  if (selectedGroup.pattern) {
    const pattern = selectedGroup.pattern;
    let value = '';
    try {
      const regex = new RegExp(pattern);
      const matched = dataAsString.match(regex);
      if (matched) {
        value = matched[0];
      }
    } catch (e: unknown) {
      console.warn(`[StaticCMS] Invalid view group pattern '${pattern}' for field '${field}'`, e);
    }
    return {
      id: `${label}${value}`,
      label,
      value,
    };
  }

  return {
    id: `${label}${fieldData}`,
    label,
    value: typeof fieldData === 'boolean' ? fieldData : dataAsString,
  };
}

export const selectEntryByPath = createSelector(
  [
    selectPublishedSlugs,
    (_state: RootState, collectionName: string) => collectionName,
    (_state: RootState, _collectionName: string, path: string) => path,
    selectEntriesBySlugs,
  ],
  (slugs, collectionName, path, entries): Entry<ObjectValue> | undefined => {
    return slugs.map(slug => getEntry(entries, collectionName, slug)).find(e => e?.path === path);
  },
);

export const selectEntriesLoaded = createSelector([selectEntryPage], (page): boolean => {
  return Boolean(page);
});

export const selectIsFetching = createSelector([selectEntryPage], (page): boolean => {
  return page?.isFetching ?? false;
});

export function selectSearchEntryIds(state: RootState) {
  return state.search.entryIds;
}

export const selectSearchedEntries = createSelector(
  [
    selectSearchEntryIds,
    selectEntriesBySlugs,
    (_state: RootState, availableCollections: string[]) => availableCollections,
  ],
  (entryIds, entries, availableCollections): Entry<ObjectValue>[] => {
    // only return search results for actually available collections
    return filterNullish(
      entryIds
        .filter(entryId => availableCollections.indexOf(entryId!.collection) !== -1)
        .map(entryId => getEntry(entries, entryId.collection, entryId.slug)),
    );
  },
);
