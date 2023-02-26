import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_NONE } from '@staticcms/core/constants';
import { selectSortDataPath } from '@staticcms/core/lib/util/sort.util';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type {
  Collection,
  Entry,
  Filter,
  Group,
  GroupMap,
  GroupOfEntries,
  Sort,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export function selectEntriesSort(entries: RootState, collection?: string) {
  if (!collection) {
    return undefined;
  }

  const sort = entries.entries.sort as Sort | undefined;
  return sort?.[collection];
}

export function selectEntriesFilter(entries: RootState, collection?: string) {
  if (!collection) {
    return {};
  }

  const filter = entries.entries.filter as Filter | undefined;
  return filter?.[collection] || {};
}

export function selectEntriesGroup(entries: RootState, collection?: string) {
  if (!collection) {
    return {};
  }

  const group = entries.entries.group as Group | undefined;
  return group?.[collection] || {};
}

export function selectEntriesGroupField(entries: RootState, collection: string) {
  const groups = selectEntriesGroup(entries, collection);
  const value = Object.values(groups ?? {}).find(v => v?.active === true);
  return value;
}

export function selectEntriesSortFields(entries: RootState, collection: string) {
  const sort = selectEntriesSort(entries, collection);
  const values = Object.values(sort ?? {}).filter(v => v?.direction !== SORT_DIRECTION_NONE) || [];

  return values;
}

export function selectEntriesFilterFields(entries: RootState, collection: string) {
  const filter = selectEntriesFilter(entries, collection);
  const values = Object.values(filter ?? {}).filter(v => v?.active === true) || [];
  return values;
}

export function selectViewStyle(entries: RootState): CollectionViewStyle {
  return entries.entries.viewStyle;
}

export function selectEntry(state: RootState, collection: string, slug: string) {
  return state.entries.entities[`${collection}.${slug}`];
}

export function selectPublishedSlugs(state: RootState, collection: string) {
  return state.entries.pages[collection]?.ids ?? [];
}

function getPublishedEntries(state: RootState, collectionName: string) {
  const slugs = selectPublishedSlugs(state, collectionName);
  const entries =
    slugs && (slugs.map(slug => selectEntry(state, collectionName, slug as string)) as Entry[]);
  return entries;
}

export function selectEntries(state: RootState, collection: Collection) {
  const collectionName = collection.name;
  let entries = getPublishedEntries(state, collectionName);

  const sortFields = selectEntriesSortFields(state, collectionName);
  if (sortFields && sortFields.length > 0) {
    const keys = sortFields.map(v => selectSortDataPath(collection, v.key));
    const orders = sortFields.map(v => (v.direction === SORT_DIRECTION_ASCENDING ? 'asc' : 'desc'));
    entries = orderBy(entries, keys, orders);
  }

  const filters = selectEntriesFilterFields(state, collectionName);
  if (filters && filters.length > 0) {
    entries = entries.filter(e => {
      const allMatched = filters.every(f => {
        const pattern = f.pattern;
        const field = f.field;
        const data = e!.data || {};
        const toMatch = get(data, field);
        const matched = toMatch !== undefined && new RegExp(String(pattern)).test(String(toMatch));
        return matched;
      });
      return allMatched;
    });
  }

  return entries;
}

function getGroup(entry: Entry, selectedGroup: GroupMap) {
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
      console.warn(`Invalid view group pattern '${pattern}' for field '${field}'`, e);
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

export function selectGroups(state: RootState, collection: Collection) {
  const collectionName = collection.name;
  const entries = getPublishedEntries(state, collectionName);

  const selectedGroup = selectEntriesGroupField(state, collectionName);
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
}

export function selectEntryByPath(state: RootState, collection: string, path: string) {
  const slugs = selectPublishedSlugs(state, collection);
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
