import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import {
  changeViewStyle as changeViewStyleAction,
  filterByField as filterByFieldAction,
  groupByField as groupByFieldAction,
  sortByField as sortByFieldAction,
} from '@staticcms/core/actions/entries';
import { SORT_DIRECTION_ASCENDING } from '@staticcms/core/constants';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import {
  selectSortableFields,
  selectViewFilters,
  selectViewGroups,
} from '@staticcms/core/lib/util/collection.util';
import {
  selectEntriesFilter,
  selectEntriesGroup,
  selectEntriesSort,
  selectViewStyle,
} from '@staticcms/core/reducers/selectors/entries';
import Card from '../common/card/Card';
import collectionClasses from './Collection.classes';
import CollectionControls from './CollectionControls';
import CollectionHeader from './CollectionHeader';
import EntriesCollection from './entries/EntriesCollection';
import EntriesSearch from './entries/EntriesSearch';

import type {
  Collection,
  SortDirection,
  TranslatedProps,
  ViewFilter,
  ViewGroup,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { FC } from 'react';
import type { ConnectedProps } from 'react-redux';

import './Collection.css';

const CollectionView: FC<CollectionViewProps> = ({
  collection,
  collections,
  isSearchResults,
  isSingleSearchResult,
  searchTerm,
  sortableFields,
  sortByField,
  sort,
  viewFilters,
  viewGroups,
  filterTerm,
  filterByField,
  groupByField,
  filter,
  group,
  changeViewStyle,
  viewStyle,
}) => {
  const t = useTranslate();

  const [readyToLoad, setReadyToLoad] = useState(false);
  const [prevCollection, setPrevCollection] = useState<Collection | null>();

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
      collection && (await sortByField(collection, key, direction));
    },
    [collection, sortByField],
  );

  const onFilterClick = useCallback(
    async (filter: ViewFilter) => {
      collection && (await filterByField(collection, filter));
    },
    [collection, filterByField],
  );

  const onGroupClick = useCallback(
    async (group: ViewGroup) => {
      collection && (await groupByField(collection, group));
    },
    [collection, groupByField],
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
            <CollectionControls viewStyle={viewStyle} onChangeViewStyle={changeViewStyle} />
          </>
        ) : (
          <>
            {collection ? <CollectionHeader collection={collection} /> : null}
            <CollectionControls
              viewStyle={viewStyle}
              onChangeViewStyle={changeViewStyle}
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

interface CollectionViewOwnProps {
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
  name?: string;
  searchTerm?: string;
  filterTerm?: string;
}

function mapStateToProps(state: RootState, ownProps: TranslatedProps<CollectionViewOwnProps>) {
  const { collections } = state;
  const {
    isSearchResults,
    isSingleSearchResult,
    name,
    searchTerm = '',
    filterTerm = '',
    t,
  } = ownProps;
  const collection = (name ? collections[name] : collections[0]) as Collection | undefined;
  const sort = selectEntriesSort(state, collection?.name);
  const sortableFields = selectSortableFields(collection, t);
  const viewFilters = selectViewFilters(collection);
  const viewGroups = selectViewGroups(collection);
  const filter = selectEntriesFilter(collection?.name)(state);
  const group = selectEntriesGroup(state, collection?.name);
  const viewStyle = selectViewStyle(state);

  return {
    isSearchResults,
    isSingleSearchResult,
    name,
    searchTerm,
    filterTerm,
    collection,
    collections,
    sort,
    sortableFields,
    viewFilters,
    viewGroups,
    filter,
    group,
    viewStyle,
  };
}

const mapDispatchToProps = {
  sortByField: sortByFieldAction,
  filterByField: filterByFieldAction,
  changeViewStyle: changeViewStyleAction,
  groupByField: groupByFieldAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type CollectionViewProps = ConnectedProps<typeof connector>;

export default connector(CollectionView);
