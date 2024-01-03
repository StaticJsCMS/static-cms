import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  changeViewStyle,
  filterByField,
  groupByField,
  sortByField,
} from '@staticcms/core/actions/entries';
import { SORT_DIRECTION_ASCENDING } from '@staticcms/core/constants';
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

import type { ViewStyle } from '@staticcms/core/constants/views';
import type { CollectionWithDefaults, SortDirection, ViewFilter, ViewGroup } from '@staticcms/core';
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

  const [readyToLoad, setReadyToLoad] = useState(false);
  const [prevCollection, setPrevCollection] = useState<CollectionWithDefaults | null>();

  useEffect(() => {
    setPrevCollection(collection);
  }, [collection]);

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
      <EntriesCollection
        collection={collection}
        viewStyle={viewStyle}
        filterTerm={filterTerm}
        readyToLoad={readyToLoad && collection === prevCollection}
      />
    );
  }, [
    collection,
    collections,
    filterTerm,
    isSearchResults,
    isSingleSearchResult,
    prevCollection,
    readyToLoad,
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
    async (filter: ViewFilter) => {
      collection && (await dispatch(filterByField(collection, filter)));
    },
    [collection, dispatch],
  );

  const onGroupClick = useCallback(
    async (group: ViewGroup) => {
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

  useEffect(() => {
    if (prevCollection === collection) {
      if (!readyToLoad) {
        setReadyToLoad(true);
      }
      return;
    }

    if (sort?.[0]?.key) {
      if (!readyToLoad) {
        setReadyToLoad(true);
      }
      return;
    }

    const defaultSort = collection?.sortable_fields?.default;
    const defaultViewGroupName = collection?.view_groups?.default;
    const defaultViewFilterName = collection?.view_filters?.default;
    if (!defaultViewGroupName && !defaultViewFilterName && (!defaultSort || !defaultSort.field)) {
      if (!readyToLoad) {
        setReadyToLoad(true);
      }
      return;
    }

    setReadyToLoad(false);

    let alive = true;

    const sortGroupFilterEntries = () => {
      setTimeout(async () => {
        if (defaultSort && defaultSort.field) {
          await onSortClick(defaultSort.field, defaultSort.direction ?? SORT_DIRECTION_ASCENDING);
        }

        if (defaultViewGroupName) {
          const defaultViewGroup = viewGroups?.groups.find(g => g.name === defaultViewGroupName);
          if (defaultViewGroup) {
            await onGroupClick(defaultViewGroup);
          }
        }

        if (defaultViewFilterName) {
          const defaultViewFilter = viewFilters?.filters.find(
            f => f.name === defaultViewFilterName,
          );
          if (defaultViewFilter) {
            await onFilterClick(defaultViewFilter);
          }
        }

        if (alive) {
          setReadyToLoad(true);
        }
      });
    };

    sortGroupFilterEntries();

    return () => {
      alive = false;
    };
  }, [
    collection,
    onFilterClick,
    onGroupClick,
    onSortClick,
    prevCollection,
    readyToLoad,
    sort,
    viewFilters?.filters,
    viewGroups?.groups,
  ]);

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
