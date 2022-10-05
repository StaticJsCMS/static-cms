import isEqual from 'lodash/isEqual';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  clearSearch as actionClearSearch,
  searchEntries as actionSearchEntries,
} from '../../../actions/search';
import { Cursor } from '../../../lib/util';
import { selectSearchedEntries } from '../../../reducers';
import Entries from './Entries';

import type { ConnectedProps } from 'react-redux';
import type { Collections, State } from '../../../interface';

const EntriesSearch = ({
  collections,
  entries,
  isFetching,
  page,
  searchTerm,
  searchEntries,
  collectionNames,
  clearSearch,
}: EntriesSearchProps) => {
  const getCursor = useCallback(() => {
    return Cursor.create({
      actions: Number.isNaN(page) ? [] : ['append_next'],
    });
  }, [page]);

  const handleCursorActions = useCallback(
    (action: string) => {
      if (action === 'append_next') {
        const nextPage = page + 1;
        searchEntries(searchTerm, collectionNames, nextPage);
      }
    },
    [collectionNames, page, searchEntries, searchTerm],
  );

  useEffect(() => {
    searchEntries(searchTerm, collectionNames);
  }, [collectionNames, searchEntries, searchTerm]);

  useEffect(() => {
    return () => {
      clearSearch();
    };
  }, [clearSearch]);

  const [prevSearch, setPrevSearch] = useState('');
  const [prevCollectionNames, setPrevCollectionNames] = useState<string[]>([]);
  useEffect(() => {
    // check if the search parameters are the same
    if (prevSearch === searchTerm && isEqual(prevCollectionNames, collectionNames)) {
      return;
    }

    setPrevSearch(searchTerm);
    setPrevCollectionNames(collectionNames);

    searchEntries(searchTerm, collectionNames);
  }, [collectionNames, prevCollectionNames, prevSearch, searchEntries, searchTerm]);

  return (
    <Entries
      cursor={getCursor()}
      handleCursorActions={handleCursorActions}
      collections={collections}
      entries={entries}
      isFetching={isFetching}
    />
  );
};

interface EntriesSearchOwnProps {
  searchTerm: string;
  collections: Collections;
}

function mapStateToProps(state: State, ownProps: EntriesSearchOwnProps) {
  const { searchTerm } = ownProps;
  const collections = Object.values(ownProps.collections);
  const collectionNames = Object.keys(ownProps.collections);
  const isFetching = state.search.isFetching;
  const page = state.search.page;
  const entries = selectSearchedEntries(state, collectionNames);
  return { isFetching, page, collections, collectionNames, entries, searchTerm };
}

const mapDispatchToProps = {
  searchEntries: actionSearchEntries,
  clearSearch: actionClearSearch,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EntriesSearchProps = ConnectedProps<typeof connector>;

export default connector(EntriesSearch);
