import isEqual from 'lodash/isEqual';

import { currentBackend } from '../backend';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { Entry, SearchQueryResponse } from '../interface';
import type { RootState } from '../store';

/*
 * Constant Declarations
 */
export const SEARCH_ENTRIES_REQUEST = 'SEARCH_ENTRIES_REQUEST';
export const SEARCH_ENTRIES_SUCCESS = 'SEARCH_ENTRIES_SUCCESS';
export const SEARCH_ENTRIES_FAILURE = 'SEARCH_ENTRIES_FAILURE';

export const QUERY_REQUEST = 'QUERY_REQUEST';
export const QUERY_SUCCESS = 'QUERY_SUCCESS';
export const QUERY_FAILURE = 'QUERY_FAILURE';

export const SEARCH_CLEAR = 'SEARCH_CLEAR';

/*
 * Simple Action Creators (Internal)
 * We still need to export them for tests
 */
export function searchingEntries(searchTerm: string, searchCollections: string[], page: number) {
  return {
    type: SEARCH_ENTRIES_REQUEST,
    payload: { searchTerm, searchCollections, page },
  } as const;
}

export function searchSuccess(entries: Entry[], page: number) {
  return {
    type: SEARCH_ENTRIES_SUCCESS,
    payload: {
      entries,
      page,
    },
  } as const;
}

export function searchFailure(error: Error) {
  return {
    type: SEARCH_ENTRIES_FAILURE,
    payload: { error },
  } as const;
}

export function querying(searchTerm: string) {
  return {
    type: QUERY_REQUEST,
    payload: {
      searchTerm,
    },
  } as const;
}

export function querySuccess(namespace: string, hits: Entry[]) {
  return {
    type: QUERY_SUCCESS,
    payload: {
      namespace,
      hits,
    },
  } as const;
}

export function queryFailure(error: Error) {
  return {
    type: QUERY_FAILURE,
    payload: { error },
  } as const;
}

/*
 * Exported simple Action Creators
 */

export function clearSearch() {
  return { type: SEARCH_CLEAR } as const;
}

/*
 * Exported Thunk Action Creators
 */

// SearchEntries will search for complete entries in all collections.
export function searchEntries(searchTerm: string, searchCollections: string[], page = 0) {
  return async (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    getState: () => RootState,
  ) => {
    const state = getState();
    const { search } = state;
    const configState = state.config;
    if (!configState.config) {
      return;
    }

    const backend = currentBackend(configState.config);
    const allCollections = searchCollections || Object.keys(state.collections);

    // avoid duplicate searches
    if (
      search.isFetching &&
      search.term === searchTerm &&
      isEqual(allCollections, search.collections)
    ) {
      return;
    }

    dispatch(searchingEntries(searchTerm, allCollections, page));

    try {
      const response = await backend.search(
        Object.entries(state.collections)
          .filter(([key, _value]) => allCollections.indexOf(key) !== -1)
          .map(([_key, value]) => value),
        searchTerm,
      );

      return dispatch(searchSuccess(response.entries, page));
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return dispatch(searchFailure(error));
      }
    }
  };
}

// Instead of searching for complete entries, query will search for specific fields
// in specific collections and return raw data (no entries).
export function query(
  namespace: string,
  collectionName: string,
  searchFields: string[],
  searchTerm: string,
  file?: string,
  limit?: number,
) {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    dispatch(querying(searchTerm));

    const state = getState();
    const configState = state.config;
    if (!configState.config) {
      return dispatch(queryFailure(new Error('Config not found')));
    }

    const backend = currentBackend(configState.config);
    const collection = Object.values(state.collections).find(
      collection => collection.name === collectionName,
    );
    if (!collection) {
      return dispatch(queryFailure(new Error('Collection not found')));
    }

    try {
      const response: SearchQueryResponse = await backend.query(
        collection,
        searchFields,
        searchTerm,
        file,
        limit,
      );
      return dispatch(querySuccess(namespace, response.hits));
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return dispatch(queryFailure(error));
      }
    }
  };
}

export type SearchAction = ReturnType<
  | typeof searchingEntries
  | typeof searchSuccess
  | typeof searchFailure
  | typeof querying
  | typeof querySuccess
  | typeof queryFailure
  | typeof clearSearch
>;
