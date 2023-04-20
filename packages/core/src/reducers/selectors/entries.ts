import get from 'lodash/get';

import { SORT_DIRECTION_NONE } from '@staticcms/core/constants';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Entry, Group, GroupMap, Sort } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export function selectEntriesSort(entries: RootState, collection?: string) {
  if (!collection) {
    return undefined;
  }

  const sort = entries.entries.sort as Sort | undefined;
  return sort?.[collection];
}

export const selectEntriesFilter = (collectionName?: string) => (entries: RootState) => {
  if (!collectionName) {
    return {};
  }

  return entries.entries.filter?.[collectionName] ?? {};
};

export function selectEntriesGroup(entries: RootState, collection?: string) {
  if (!collection) {
    return {};
  }

  const group = entries.entries.group as Group | undefined;
  return group?.[collection] || {};
}

export const selectEntriesGroupField = (collection: string) => (entries: RootState) => {
  const groups = selectEntriesGroup(entries, collection);
  return Object.values(groups ?? {}).find(v => v?.active === true);
};

export const selectEntriesSortField = (collectionName: string) => (entries: RootState) => {
  const sort = selectEntriesSort(entries, collectionName);
  return Object.values(sort ?? {}).find(v => v?.direction !== SORT_DIRECTION_NONE);
};

export function selectViewStyle(entries: RootState): ViewStyle {
  return entries.entries.viewStyle;
}

export function selectEntriesBySlugs(state: RootState) {
  return state.entries.entities;
}

export function selectEntry(state: RootState, collection: string, slug: string) {
  return state.entries.entities[`${collection}.${slug}`];
}

export const selectPublishedSlugs = (collection: string) => (state: RootState) => {
  return state.entries.pages[collection]?.ids ?? [];
};

export const selectPublishedEntries = (collectionName: string) => (state: RootState) => {
  const slugs = selectPublishedSlugs(collectionName)(state);
  return (
    slugs && (slugs.map(slug => selectEntry(state, collectionName, slug as string)) as Entry[])
  );
};

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

export function selectEntryByPath(state: RootState, collection: string, path: string) {
  const slugs = selectPublishedSlugs(collection)(state);
  const entries =
    slugs && (slugs.map(slug => selectEntry(state, collection, slug as string)) as Entry[]);

  return entries && entries.find(e => e?.path === path);
}

export function selectEntriesLoaded(state: RootState, collection: string) {
  return !!state.entries.pages[collection];
}

export function selectIsFetching(state: RootState, collection: string) {
  return state.entries.pages[collection]?.isFetching ?? false;
}

export function selectSearchedEntries(state: RootState, availableCollections: string[]) {
  // only return search results for actually available collections
  return state.search.entryIds
    .filter(entryId => availableCollections.indexOf(entryId!.collection) !== -1)
    .map(entryId => selectEntry(state, entryId!.collection, entryId!.slug));
}
