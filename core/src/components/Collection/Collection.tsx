import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  changeViewStyle as changeViewStyleAction,
  filterByField as filterByFieldAction,
  groupByField as groupByFieldAction,
  sortByField as sortByFieldAction,
} from '../../actions/entries';
import { components } from '../../components/UI/styles';
import { SORT_DIRECTION_ASCENDING } from '../../constants';
import { getNewEntryUrl } from '../../lib/urlHelper';
import {
  selectSortableFields,
  selectViewFilters,
  selectViewGroups,
} from '../../lib/util/collection.util';
import {
  selectEntriesFilter,
  selectEntriesGroup,
  selectEntriesSort,
  selectViewStyle,
} from '../../reducers/entries';
import CollectionControls from './CollectionControls';
import CollectionTop from './CollectionTop';
import EntriesCollection from './Entries/EntriesCollection';
import EntriesSearch from './Entries/EntriesSearch';
import Sidebar from './Sidebar';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type {
  Collection,
  SortDirection,
  TranslatedProps,
  ViewFilter,
  ViewGroup,
} from '../../interface';
import type { RootState } from '../../store';

const CollectionMain = styled('main')`
  width: 100%;
`;

const SearchResultContainer = styled('div')`
  ${components.cardTop};
  margin-bottom: 22px;
`;

const SearchResultHeading = styled('h1')`
  ${components.cardTopHeading};
`;

const CollectionView = ({
  collection,
  collections,
  collectionName,
  isSearchEnabled,
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
    let url = 'fields' in collection && collection.create ? getNewEntryUrl(collectionName) : '';
    if (url && filterTerm) {
      url = getNewEntryUrl(collectionName);
      if (filterTerm) {
        url = `${newEntryUrl}?path=${filterTerm}`;
      }
    }
    return url;
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

      return <EntriesSearch collections={searchCollections} searchTerm={searchTerm} />;
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
      await sortByField(collection, key, direction);
    },
    [collection, sortByField],
  );

  const onFilterClick = useCallback(
    async (filter: ViewFilter) => {
      await filterByField(collection, filter);
    },
    [collection, filterByField],
  );

  const onGroupClick = useCallback(
    async (group: ViewGroup) => {
      await groupByField(collection, group);
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

    const defaultSort = collection.sortable_fields?.default;
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

  return (
    <>
      <Sidebar
        collections={collections}
        collection={(!isSearchResults || isSingleSearchResult) && collection}
        isSearchEnabled={isSearchEnabled}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
      />
      <CollectionMain>
        <>
          {isSearchResults ? (
            <SearchResultContainer>
              <SearchResultHeading>
                {t(searchResultKey, { searchTerm, collection: collection.label })}
              </SearchResultHeading>
            </SearchResultContainer>
          ) : (
            <>
              <CollectionTop collection={collection} newEntryUrl={newEntryUrl} />
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
          {entries}
        </>
      </CollectionMain>
    </>
  );
};

interface CollectionViewOwnProps {
  isSearchResults?: boolean;
  isSingleSearchResult?: boolean;
  name: string;
  searchTerm?: string;
  filterTerm?: string;
}

function mapStateToProps(state: RootState, ownProps: TranslatedProps<CollectionViewOwnProps>) {
  const { collections } = state;
  const isSearchEnabled = state.config.config && state.config.config.search != false;
  const {
    isSearchResults,
    isSingleSearchResult,
    name,
    searchTerm = '',
    filterTerm = '',
    t,
  } = ownProps;
  const collection: Collection = name ? collections[name] : collections[0];
  const sort = selectEntriesSort(state.entries, collection.name);
  const sortableFields = selectSortableFields(collection, t);
  const viewFilters = selectViewFilters(collection);
  const viewGroups = selectViewGroups(collection);
  const filter = selectEntriesFilter(state.entries, collection.name);
  const group = selectEntriesGroup(state.entries, collection.name);
  const viewStyle = selectViewStyle(state.entries);

  return {
    isSearchResults,
    isSingleSearchResult,
    name,
    searchTerm,
    filterTerm,
    collection,
    collections,
    collectionName: name,
    isSearchEnabled,
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
