import React, { useCallback, useMemo } from 'react';

import {
  changeViewStyle,
  filterByField,
  groupByField,
  sortByField,
} from '@staticcms/core/actions/entries';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import {
  getSortableFields,
  getViewFilters,
  getViewGroups,
} from '@staticcms/core/lib/util/collection.util';
import { selectCollections } from '@staticcms/core/reducers/selectors/collections';
import {
  selectEntriesFilter,
  selectEntriesGroup,
  selectEntriesSort,
  selectViewStyle,
} from '@staticcms/core/reducers/selectors/entries';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Card from '../common/card/Card';
import collectionClasses from './Collection.classes';
import CollectionControls from './CollectionControls';
import CollectionHeader from './CollectionHeader';
import EntriesCollection from './entries/EntriesCollection';
import EntriesSearch from './entries/EntriesSearch';

import type {
  CollectionWithDefaults,
  SortDirection,
  ViewFilterWithDefaults,
  ViewGroupWithDefaults,
} from '@staticcms/core';
import type { ViewStyle } from '@staticcms/core/constants/views';
import type { FC } from 'react';

import './Collection.css';

export interface CollectionViewProps {
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
  name?: string;
  searchTerm?: string;
  filterTerm?: string;
}

const CollectionView: FC<CollectionViewProps> = ({
  name: collectionName,
  isSearchResults,
  isSingleSearchResult,
  searchTerm = '',
  filterTerm = '',
}) => {
  const t = useTranslate();
  const dispatch = useAppDispatch();

  const collections = useAppSelector(selectCollections);
  const collection = useMemo(
    () =>
      (collectionName ? collections[collectionName] : collections[0]) as
        | CollectionWithDefaults
        | undefined,
    [collectionName, collections],
  );

  const viewStyle = useAppSelector(selectViewStyle);
  const sort = useAppSelector(state => selectEntriesSort(state, collectionName));
  const viewFilters = useMemo(() => getViewFilters(collection), [collection]);
  const viewGroups = useMemo(() => getViewGroups(collection), [collection]);

  const sortableFields = useMemo(() => getSortableFields(collection, t), [collection, t]);
  const filter = useAppSelector(state => selectEntriesFilter(state, collection?.name));
  const group = useAppSelector(state => selectEntriesGroup(state, collection?.name));

  const searchResultKey = useMemo(
    () => `collection.collectionTop.searchResults${isSingleSearchResult ? 'InCollection' : ''}`,
    [isSingleSearchResult],
  );

  const entries = useMemo(() => {
    if (isSearchResults) {
      let searchCollections = collections;
      if (isSingleSearchResult) {
        const searchCollection = Object.values(collections).filter(c => c === collection);
        if (searchCollection.length === 1) {
          searchCollections = {
            [searchCollection[0].name]: searchCollection[0],
          };
        }
      }

      return (
        <EntriesSearch
          key="search"
          collections={searchCollections}
          searchTerm={searchTerm}
          filterTerm={filterTerm}
          viewStyle={viewStyle}
        />
      );
    }

    if (!collection) {
      return null;
    }

    return (
      <EntriesCollection collection={collection} viewStyle={viewStyle} filterTerm={filterTerm} />
    );
  }, [
    collection,
    collections,
    filterTerm,
    isSearchResults,
    isSingleSearchResult,
    searchTerm,
    viewStyle,
  ]);

  const onSortClick = useCallback(
    async (key: string, direction?: SortDirection) => {
      collection && (await dispatch(sortByField(collection, key, direction)));
    },
    [collection, dispatch],
  );

  const onFilterClick = useCallback(
    async (filter: ViewFilterWithDefaults) => {
      collection && (await dispatch(filterByField(collection, filter)));
    },
    [collection, dispatch],
  );

  const onGroupClick = useCallback(
    async (group: ViewGroupWithDefaults) => {
      collection && (await dispatch(groupByField(collection, group)));
    },
    [collection, dispatch],
  );

  const onChangeViewStyle = useCallback(
    (viewStyle: ViewStyle) => {
      dispatch(changeViewStyle(viewStyle));
    },
    [dispatch],
  );

  const collectionDescription = collection?.description;

  return (
    <div className={collectionClasses.root}>
      <div className={collectionClasses.content}>
        {isSearchResults ? (
          <>
            <div className={collectionClasses['search-query']}>
              <div>{t(searchResultKey, { searchTerm, collection: collection?.label })}</div>
            </div>
            <CollectionControls viewStyle={viewStyle} onChangeViewStyle={onChangeViewStyle} />
          </>
        ) : (
          <>
            {collection ? <CollectionHeader collection={collection} /> : null}
            <CollectionControls
              viewStyle={viewStyle}
              onChangeViewStyle={onChangeViewStyle}
              sortableFields={sortableFields}
              onSortClick={onSortClick}
              sort={sort}
              viewFilters={viewFilters?.filters ?? []}
              viewGroups={viewGroups?.groups ?? []}
              onFilterClick={onFilterClick}
              onGroupClick={onGroupClick}
              filter={filter}
              group={group}
            />
          </>
        )}
      </div>
      {collectionDescription ? (
        <div className={collectionClasses.description}>
          <Card className={collectionClasses['description-card']}>{collectionDescription}</Card>
        </div>
      ) : null}
      {entries}
    </div>
  );
};

export default CollectionView;
