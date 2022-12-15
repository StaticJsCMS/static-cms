import { styled } from '@mui/material/styles';
import React from 'react';
import { translate } from 'react-polyglot';

import Loader from '@staticcms/core/components/UI/Loader';
import EntryListing from './EntryListing';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Collection, Collections, Entry, TranslatedProps } from '@staticcms/core/interface';
import type Cursor from '@staticcms/core/lib/util/Cursor';

const PaginationMessage = styled('div')`
  padding: 16px;
  text-align: center;
`;

const NoEntriesMessage = styled(PaginationMessage)`
  margin-top: 16px;
`;

export interface BaseEntriesProps {
  entries: Entry[];
  page?: number;
  isFetching: boolean;
  viewStyle: CollectionViewStyle;
  cursor: Cursor;
  handleCursorActions?: (action: string) => void;
}

export interface SingleCollectionEntriesProps extends BaseEntriesProps {
  collection: Collection;
}

export interface MultipleCollectionEntriesProps extends BaseEntriesProps {
  collections: Collections;
}

export type EntriesProps = SingleCollectionEntriesProps | MultipleCollectionEntriesProps;

const Entries = ({
  entries,
  isFetching,
  viewStyle,
  cursor,
  handleCursorActions,
  t,
  page,
  ...otherProps
}: TranslatedProps<EntriesProps>) => {
  const loadingMessages = [
    t('collection.entries.loadingEntries'),
    t('collection.entries.cachingEntries'),
    t('collection.entries.longerLoading'),
  ];

  if (isFetching && page === undefined) {
    return <Loader>{loadingMessages}</Loader>;
  }

  const hasEntries = (entries && entries.length > 0) || cursor?.actions?.has('append_next');
  if (hasEntries) {
    return (
      <>
        {'collection' in otherProps ? (
          <EntryListing
            collection={otherProps.collection}
            entries={entries}
            viewStyle={viewStyle}
            cursor={cursor}
            handleCursorActions={handleCursorActions}
            page={page}
          />
        ) : (
          <EntryListing
            collections={otherProps.collections}
            entries={entries}
            viewStyle={viewStyle}
            cursor={cursor}
            handleCursorActions={handleCursorActions}
            page={page}
          />
        )}
        {isFetching && page !== undefined && entries.length > 0 ? (
          <PaginationMessage>{t('collection.entries.loadingEntries')}</PaginationMessage>
        ) : null}
      </>
    );
  }

  return <NoEntriesMessage>{t('collection.entries.noEntries')}</NoEntriesMessage>;
};

export default translate()(Entries);
