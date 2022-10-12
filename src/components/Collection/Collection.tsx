import styled from '@emotion/styled';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import { changeViewStyle, filterByField, groupByField, sortByField } from '../../actions/entries';
import { SortDirection } from '../../interface';
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
import { components, lengths } from '../../ui';
import CollectionControls from './CollectionControls';
import CollectionTop from './CollectionTop';
import EntriesCollection from './Entries/EntriesCollection';
import EntriesSearch from './Entries/EntriesSearch';
import Sidebar from './Sidebar';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Collection, TranslatedProps, ViewFilter, ViewGroup } from '../../interface';
import type { RootState } from '../../store';

const CollectionContainer = styled.div`
  margin: ${lengths.pageMargin};
`;

const CollectionMain = styled.main`
  padding-left: 280px;
`;

const SearchResultContainer = styled.div`
  ${components.cardTop};
  margin-bottom: 22px;
`;

const SearchResultHeading = styled.h1`
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
  const [preCollection, setPreCollection] = useState(collection);
  useEffect(() => {
    setPreCollection(collection);
  }, [collection]);

  const newEntryUrl = useMemo(() => {
    let url = collection.create ? getNewEntryUrl(collectionName) : '';
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

  const renderEntriesCollection = useCallback(() => {
    return (
      <EntriesCollection
        collection={collection}
        viewStyle={viewStyle}
        filterTerm={filterTerm}
        readyToLoad={readyToLoad && collection === preCollection}
      />
    );
  }, [collection, viewStyle, filterTerm, readyToLoad, preCollection]);

  const renderEntriesSearch = useCallback(() => {
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
  }, [searchTerm, collections, collection, isSingleSearchResult]);

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
    setReadyToLoad(false);
    let alive = true;

    const sortEntries = () => {
      setTimeout(async () => {
        if (sort?.[0]?.key) {
          setReadyToLoad(true);
          return;
        }

        const defaultSort = collection.sortable_fields.default;
        if (!defaultSort || !defaultSort.field) {
          setReadyToLoad(true);
          return;
        }

        await onSortClick(
          defaultSort.field,
          defaultSort.direction ?? SortDirection.Ascending,
        );

        if (alive) {
          setReadyToLoad(true);
        }
      });
    };

    sortEntries();

    return () => {
      alive = false;
    };
  }, [collection, onSortClick, sort]);

  return (
    <CollectionContainer>
      <Sidebar
        collections={collections}
        collection={(!isSearchResults || isSingleSearchResult) && collection}
        isSearchEnabled={isSearchEnabled}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
      />
      <CollectionMain>
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
              viewFilters={viewFilters}
              viewGroups={viewGroups}
              t={t}
              onFilterClick={onFilterClick}
              onGroupClick={onGroupClick}
              filter={filter}
              group={group}
            />
          </>
        )}
        {isSearchResults ? renderEntriesSearch() : renderEntriesCollection()}
      </CollectionMain>
    </CollectionContainer>
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
  sortByField,
  filterByField,
  changeViewStyle,
  groupByField,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type CollectionViewProps = ConnectedProps<typeof connector>;

export default translate()(connector(CollectionView)) as ComponentType<CollectionViewOwnProps>;
