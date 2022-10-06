import styled from '@emotion/styled';
import React from 'react';
import { translate } from 'react-polyglot';

import { lengths, Loader } from '../../../ui';
import EntryListing from './EntryListing';

import type { CollectionViewStyle } from '../../../constants/collectionViews';
import type { Collections, Entry, TranslatedProps } from '../../../interface';
import type Cursor from '../../../lib/util/Cursor';

const PaginationMessage = styled.div`
  width: ${lengths.topCardWidth};
  padding: 16px;
  text-align: center;
`;

const NoEntriesMessage = styled(PaginationMessage)`
  margin-top: 16px;
`;

interface EntriesProps {
  collections: Collections;
  entries: Entry[];
  page?: number;
  isFetching: boolean;
  viewStyle: CollectionViewStyle;
  cursor: Cursor;
  handleCursorActions: (action: string) => void;
}

const Entries = ({
  collections,
  entries,
  isFetching,
  viewStyle,
  cursor,
  handleCursorActions,
  t,
  page,
}: TranslatedProps<EntriesProps>) => {
  const loadingMessages = [
    t('collection.entries.loadingEntries'),
    t('collection.entries.cachingEntries'),
    t('collection.entries.longerLoading'),
  ];

  if (isFetching && page === undefined) {
    return <Loader $active>{loadingMessages}</Loader>;
  }

  const hasEntries = (entries && entries.length > 0) || cursor?.actions?.has('append_next');
  if (hasEntries) {
    return (
      <>
        <EntryListing
          collections={collections}
          entries={entries}
          viewStyle={viewStyle}
          cursor={cursor}
          handleCursorActions={handleCursorActions}
          page={page}
        />
        {isFetching && page !== undefined && entries.length > 0 ? (
          <PaginationMessage>{t('collection.entries.loadingEntries')}</PaginationMessage>
        ) : null}
      </>
    );
  }

  return <NoEntriesMessage>{t('collection.entries.noEntries')}</NoEntriesMessage>;
};

export default translate()(Entries);
