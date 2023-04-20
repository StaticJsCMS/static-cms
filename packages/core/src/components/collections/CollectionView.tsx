import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  changeViewStyle as changeViewStyleAction,
  filterByField as filterByFieldAction,
  groupByField as groupByFieldAction,
  sortByField as sortByFieldAction,
} from '@staticcms/core/actions/entries';
import { SORT_DIRECTION_ASCENDING } from '@staticcms/core/constants';
import { getNewEntryUrl } from '@staticcms/core/lib/urlHelper';
import {
  selectSortableFields,
  selectViewFilters,
  selectViewGroups,
} from '@staticcms/core/lib/util/collection.util';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import {
  selectEntriesFilter,
  selectEntriesGroup,
  selectEntriesSort,
  selectViewStyle,
} from '@staticcms/core/reducers/selectors/entries';
import Card from '../common/card/Card';
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
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';

const CollectionView = ({
  collection,
  collections,
  collectionName,
  isSearchResults,
  isSingleSearchResult,
  searchTerm,
  sortableFields,
  sortByField,
  sort,
  viewFilters,
  viewGroups,
  filterTerm,
  t,
  filterByField,
  groupByField,
  filter,
  group,
  changeViewStyle,
  viewStyle,
}: TranslatedProps<CollectionViewProps>) => {
  const [readyToLoad, setReadyToLoad] = useState(false);
  const [prevCollection, setPrevCollection] = useState<Collection | null>();

  useEffect(() => {
    setPrevCollection(collection);
  }, [collection]);

  const newEntryUrl = useMemo(() => {
    if (!collectionName || !collection) {
      return undefined;
    }

    return 'fields' in collection && collection.create
      ? `${getNewEntryUrl(collectionName)}${isNotEmpty(filterTerm) ? `/${filterTerm}` : ''}`
      : '';
  }, [collection, collectionName, filterTerm]);

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
    if (!defaultSort || !defaultSort.field) {
      if (!readyToLoad) {
        setReadyToLoad(true);
      }
      return;
    }

    setReadyToLoad(false);

    let alive = true;

    const sortEntries = () => {
      setTimeout(async () => {
        await onSortClick(defaultSort.field, defaultSort.direction ?? SORT_DIRECTION_ASCENDING);

        if (alive) {
          setReadyToLoad(true);
        }
      });
    };

    sortEntries();

    return () => {
      alive = false;
    };
  }, [collection, onSortClick, prevCollection, readyToLoad, sort]);

  const collectionDescription = collection?.description;

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        {isSearchResults ? (
          <>
            <div className="flex-grow">
              <div>{t(searchResultKey, { searchTerm, collection: collection?.label })}</div>
            </div>
            <CollectionControls viewStyle={viewStyle} onChangeViewStyle={changeViewStyle} t={t} />
          </>
        ) : (
          <>
            <CollectionHeader collection={collection} newEntryUrl={newEntryUrl} />
            <CollectionControls
              viewStyle={viewStyle}
              onChangeViewStyle={changeViewStyle}
              sortableFields={sortableFields}
              onSortClick={onSortClick}
              sort={sort}
              viewFilters={viewFilters ?? []}
              viewGroups={viewGroups ?? []}
              t={t}
              onFilterClick={onFilterClick}
              onGroupClick={onGroupClick}
              filter={filter}
              group={group}
            />
          </>
        )}
      </div>
      {collectionDescription ? (
        <div className="flex flex-grow mb-4">
          <Card className="flex-grow px-3.5 py-2.5 text-sm">{collectionDescription}</Card>
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
    collectionName: name,
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

export default translate()(connector(CollectionView)) as ComponentType<CollectionViewOwnProps>;
