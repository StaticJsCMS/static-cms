import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import once from 'lodash/once';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';

import {
  CHANGE_VIEW_STYLE,
  ENTRIES_FAILURE,
  ENTRIES_REQUEST,
  ENTRIES_SUCCESS,
  ENTRY_DELETE_SUCCESS,
  ENTRY_FAILURE,
  ENTRY_REQUEST,
  ENTRY_SUCCESS,
  FILTER_ENTRIES_FAILURE,
  FILTER_ENTRIES_REQUEST,
  FILTER_ENTRIES_SUCCESS,
  GROUP_ENTRIES_FAILURE,
  GROUP_ENTRIES_REQUEST,
  GROUP_ENTRIES_SUCCESS,
  SORT_ENTRIES_FAILURE,
  SORT_ENTRIES_REQUEST,
  SORT_ENTRIES_SUCCESS,
} from '../actions/entries';
import { SEARCH_ENTRIES_SUCCESS } from '../actions/search';
import { VIEW_STYLE_LIST } from '../constants/collectionViews';
import { SortDirection } from '../interface';
import { set } from '../lib/util/object.util';
import { selectSortDataPath } from '../lib/util/sort.util';

import type { EntriesAction } from '../actions/entries';
import type { SearchAction } from '../actions/search';
import type { CollectionViewStyle } from '../constants/collectionViews';
import type {
  Collection,
  Entities,
  Entry,
  Filter,
  FilterMap,
  Group,
  GroupMap,
  GroupOfEntries,
  Pages,
  Sort,
  SortMap,
  SortObject,
} from '../interface';
import type { EntryDraftState } from './entryDraft';

const storageSortKey = '../netlify-cms.entries.sort';
const viewStyleKey = '../netlify-cms.entries.viewStyle';
type StorageSortObject = SortObject & { index: number };
type StorageSort = { [collection: string]: { [key: string]: StorageSortObject } };

const loadSort = once(() => {
  const sortString = localStorage.getItem(storageSortKey);
  if (sortString) {
    try {
      const sort: StorageSort = JSON.parse(sortString);
      const map: Sort = {};
      Object.entries(sort).forEach(([collection, sort]) => {
        const orderedMap: SortMap = {};
        sortBy(Object.values(sort), ['index']).forEach(value => {
          const { key, direction } = value;
          orderedMap[key] = { key, direction };
        });
        map[collection] = orderedMap;
      });
      return map;
    } catch (e: unknown) {
      return {} as Sort;
    }
  }
  return {} as Sort;
});

function clearSort() {
  localStorage.removeItem(storageSortKey);
}

function persistSort(sort: Sort | undefined) {
  if (sort) {
    const storageSort: StorageSort = {};
    Object.keys(sort).forEach(key => {
      const collection = key as string;
      const sortObjects = (
        (sort[collection] ? Object.values(sort[collection]) : []) as SortObject[]
      ).map((value, index) => ({ ...value, index }));

      sortObjects.forEach(value => {
        set(storageSort, `${collection}.${value.key}`, value);
      });
    });
    localStorage.setItem(storageSortKey, JSON.stringify(storageSort));
  } else {
    clearSort();
  }
}

const loadViewStyle = once(() => {
  const viewStyle = localStorage.getItem(viewStyleKey) as CollectionViewStyle;
  if (viewStyle) {
    return viewStyle;
  }

  localStorage.setItem(viewStyleKey, VIEW_STYLE_LIST);
  return VIEW_STYLE_LIST;
});

function clearViewStyle() {
  localStorage.removeItem(viewStyleKey);
}

function persistViewStyle(viewStyle: string | undefined) {
  if (viewStyle) {
    localStorage.setItem(viewStyleKey, viewStyle);
  } else {
    clearViewStyle();
  }
}

export type EntriesState = {
  pages: Pages;
  entities: Entities;
  sort: Sort;
  filter?: Filter;
  group?: Group;
  viewStyle: CollectionViewStyle;
};

function entries(
  state: EntriesState = { entities: {}, pages: {}, sort: loadSort(), viewStyle: loadViewStyle() },
  action: EntriesAction | SearchAction,
): EntriesState {
  switch (action.type) {
    case ENTRY_REQUEST: {
      const payload = action.payload;

      const key = `${payload.collection}.${payload.slug}`;
      const newEntity: Entry = {
        ...(state.entities[key] ?? {}),
      };

      newEntity.isFetching = true;

      return {
        ...state,
        entities: {
          ...state.entities,
          [key]: newEntity,
        },
      };
    }

    case ENTRY_SUCCESS: {
      const payload = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [`${payload.collection}.${payload.entry.slug}`]: payload.entry,
        },
      };
    }

    case ENTRIES_REQUEST: {
      const payload = action.payload;

      const pages = {
        ...state.pages,
      };

      if (payload.collection in pages) {
        const newCollection = {
          ...(pages[payload.collection] ?? {}),
        };

        newCollection.isFetching = true;

        pages[payload.collection] = newCollection;
      }

      return { ...state, pages };
    }

    case ENTRIES_SUCCESS: {
      const payload = action.payload;
      const loadedEntries = payload.entries;
      const page = payload.page;

      const entities = {
        ...state.entities,
      };

      loadedEntries.forEach(entry => {
        entities[`${payload.collection}.${entry.slug}`] = { ...entry, isFetching: false };
      });

      const pages = {
        ...state.pages,
      };

      pages[payload.collection] = {
        page: page ?? undefined,
        ids: loadedEntries.map(entry => entry.slug),
        isFetching: false,
      };

      return { ...state, entities, pages };
    }

    case ENTRIES_FAILURE: {
      const pages = {
        ...state.pages,
      };

      if (action.meta.collection in pages) {
        const newCollection = {
          ...(pages[action.meta.collection] ?? {}),
        };

        newCollection.isFetching = false;

        pages[action.meta.collection] = newCollection;
      }

      return { ...state, pages };
    }

    case ENTRY_FAILURE: {
      const payload = action.payload;
      const key = `${payload.collection}.${payload.slug}`;

      return {
        ...state,
        entities: {
          ...state.entities,
          [key]: {
            ...(state.entities[key] ?? {}),
            isFetching: false,
            error: payload.error.message,
          },
        },
      };
    }

    case SEARCH_ENTRIES_SUCCESS: {
      const payload = action.payload;
      const loadedEntries = payload.entries;

      const entities = {
        ...state.entities,
      };

      loadedEntries.forEach(entry => {
        entities[`${entry.collection}.${entry.slug}`] = {
          ...entry,
          isFetching: false,
        };
      });

      return { ...state, entities };
    }

    case ENTRY_DELETE_SUCCESS: {
      const payload = action.payload;
      const collection = payload.collectionName;
      const slug = payload.entrySlug;

      const entities = {
        ...state.entities,
      };

      delete entities[`${collection}.${slug}`];

      const pages = {
        ...state.pages,
      };

      const newPagesCollection = {
        ...(pages[collection] ?? {}),
      };

      if (!newPagesCollection.ids) {
        newPagesCollection.ids = [];
      }

      newPagesCollection.ids = newPagesCollection.ids.filter(
        (id: string) => id !== payload.entrySlug,
      );

      pages[collection] = newPagesCollection;

      return {
        ...state,
        entities,
        pages,
      };
    }

    case SORT_ENTRIES_REQUEST: {
      const payload = action.payload;
      const { collection, key, direction } = payload;

      const sort = {
        ...state.sort,
      };

      sort[collection] = { [key]: { key, direction } } as SortMap;

      const pages = {
        ...state.pages,
      };

      const newPagesCollection = {
        ...(pages[collection] ?? {}),
      };

      newPagesCollection.isFetching = true;
      delete newPagesCollection.page;

      pages[collection] = newPagesCollection;

      persistSort(sort);

      return {
        ...state,
        sort,
        pages,
      };
    }

    case GROUP_ENTRIES_SUCCESS:
    case FILTER_ENTRIES_SUCCESS:
    case SORT_ENTRIES_SUCCESS: {
      const payload = action.payload as { collection: string; entries: Entry[] };
      const { collection, entries } = payload;

      const entities = {
        ...state.entities,
      };

      entries.forEach(entry => {
        entities[`${entry.collection}.${entry.slug}`] = {
          ...entry,
          isFetching: false,
        };
      });

      const pages = {
        ...state.pages,
      };

      const ids = entries.map(entry => entry.slug);

      pages[collection] = {
        page: 1,
        ids,
        isFetching: false,
      };

      return {
        ...state,
        entities,
        pages,
      };
    }

    case SORT_ENTRIES_FAILURE: {
      const payload = action.payload;
      const { collection, key } = payload;

      const sort = {
        ...state.sort,
      };

      const newSortCollection = {
        ...(sort[collection] ?? {}),
      };

      delete newSortCollection[key];

      sort[collection] = newSortCollection;

      const pages = {
        ...state.pages,
      };

      const newPagesCollection = {
        ...(pages[collection] ?? {}),
      };

      newPagesCollection.isFetching = false;
      delete newPagesCollection.page;

      pages[collection] = newPagesCollection;

      persistSort(sort);

      return {
        ...state,
        sort,
        pages,
      };
    }

    case FILTER_ENTRIES_REQUEST: {
      const payload = action.payload;
      const { collection, filter: viewFilter } = payload;

      const filter = {
        ...state.filter,
      };

      const newFilterCollection = {
        ...(filter[collection] ?? {}),
      };

      let newFilter: FilterMap;
      if (viewFilter.id in newFilterCollection) {
        newFilter = { ...newFilterCollection[viewFilter.id] };
      } else {
        newFilter = { ...viewFilter };
      }

      newFilter.active = !newFilter.active;
      newFilterCollection[viewFilter.id] = newFilter;
      filter[collection] = newFilterCollection;

      return {
        ...state,
        filter,
      };
    }

    case FILTER_ENTRIES_FAILURE: {
      const payload = action.payload;
      const { collection, filter: viewFilter } = payload;

      const filter = {
        ...state.filter,
      };

      const newFilterCollection = {
        ...(filter[collection] ?? {}),
      };

      delete newFilterCollection[viewFilter.id];
      filter[collection] = newFilterCollection;

      const pages = {
        ...state.pages,
      };

      const newPagesCollection = {
        ...(pages[collection] ?? {}),
      };

      newPagesCollection.isFetching = false;

      pages[collection] = newPagesCollection;

      return {
        ...state,
        filter,
        pages,
      };
    }

    case GROUP_ENTRIES_REQUEST: {
      const payload = action.payload;
      const { collection, group: groupBy } = payload;

      const group = {
        ...state.group,
      };

      let newGroup: GroupMap;
      if (group[collection] && groupBy.id in group[collection]) {
        newGroup = { ...group[collection][groupBy.id] };
      } else {
        newGroup = { ...groupBy };
      }

      newGroup.active = !newGroup.active;
      group[collection] = {
        [groupBy.id]: newGroup,
      };

      return {
        ...state,
        group,
      };
    }

    case GROUP_ENTRIES_FAILURE: {
      const payload = action.payload;
      const { collection, group: groupBy } = payload;

      const group = {
        ...state.group,
      };

      const newGroupCollection = {
        ...(group[collection] ?? {}),
      };

      delete newGroupCollection[groupBy.id];

      group[collection] = newGroupCollection;

      const pages = {
        ...state.pages,
      };

      const newPagesCollection = {
        ...(pages[collection] ?? {}),
      };

      newPagesCollection.isFetching = false;

      pages[collection] = newPagesCollection;

      return {
        ...state,
        group,
        pages,
      };
    }

    case CHANGE_VIEW_STYLE: {
      const payload = action.payload;
      const { style } = payload;
      persistViewStyle(style);
      return {
        ...state,
        viewStyle: style,
      };
    }

    default:
      return state;
  }
}

export function selectEntriesSort(entries: EntriesState, collection: string) {
  const sort = entries.sort as Sort | undefined;
  return sort?.[collection];
}

export function selectEntriesFilter(entries: EntriesState, collection: string) {
  const filter = entries.filter as Filter | undefined;
  return filter?.[collection] || {};
}

export function selectEntriesGroup(entries: EntriesState, collection: string) {
  const group = entries.group as Group | undefined;
  return group?.[collection] || {};
}

export function selectEntriesGroupField(entries: EntriesState, collection: string) {
  const groups = selectEntriesGroup(entries, collection);
  const value = Object.values(groups ?? {}).find(v => v?.active === true);
  return value;
}

export function selectEntriesSortFields(entries: EntriesState, collection: string) {
  const sort = selectEntriesSort(entries, collection);
  const values = Object.values(sort ?? {}).filter(v => v?.direction !== SortDirection.None) || [];

  return values;
}

export function selectEntriesFilterFields(entries: EntriesState, collection: string) {
  const filter = selectEntriesFilter(entries, collection);
  const values = Object.values(filter ?? {}).filter(v => v?.active === true) || [];
  return values;
}

export function selectViewStyle(entries: EntriesState): CollectionViewStyle {
  return entries.viewStyle;
}

export function selectEntry(state: EntriesState, collection: string, slug: string) {
  return state.entities[`${collection}.${slug}`];
}

export function selectPublishedSlugs(state: EntriesState, collection: string) {
  return state.pages[collection]?.ids ?? [];
}

function getPublishedEntries(state: EntriesState, collectionName: string) {
  const slugs = selectPublishedSlugs(state, collectionName);
  const entries =
    slugs && (slugs.map(slug => selectEntry(state, collectionName, slug as string)) as Entry[]);
  return entries;
}

export function selectEntries(state: EntriesState, collection: Collection) {
  const collectionName = collection.name;
  let entries = getPublishedEntries(state, collectionName);

  const sortFields = selectEntriesSortFields(state, collectionName);
  if (sortFields && sortFields.length > 0) {
    const keys = sortFields.map(v => selectSortDataPath(collection, v.key));
    const orders = sortFields.map(v => (v.direction === SortDirection.Ascending ? 'asc' : 'desc'));
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

export function selectGroups(state: EntriesState, collection: Collection) {
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

export function selectEntryByPath(state: EntriesState, collection: string, path: string) {
  const slugs = selectPublishedSlugs(state, collection);
  const entries =
    slugs && (slugs.map(slug => selectEntry(state, collection, slug as string)) as Entry[]);

  return entries && entries.find(e => e?.path === path);
}

export function selectEntriesLoaded(state: EntriesState, collection: string) {
  return !!state.pages[collection];
}

export function selectIsFetching(state: EntriesState, collection: string) {
  return state.pages[collection]?.isFetching ?? false;
}

export function selectEditingDraft(state: EntryDraftState) {
  return state.entry;
}

export default entries;
