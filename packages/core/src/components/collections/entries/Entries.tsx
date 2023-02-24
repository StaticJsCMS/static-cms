import React from 'react';
import { translate } from 'react-polyglot';

import Loader from '@staticcms/core/components/common/progress/Loader';
import EntryListing from './EntryListing';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Collection, Collections, Entry, TranslatedProps } from '@staticcms/core/interface';
import type Cursor from '@staticcms/core/lib/util/Cursor';

export interface BaseEntriesProps {
  entries: Entry[];
  page?: number;
  isFetching: boolean;
  viewStyle: ViewStyle;
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
            key="collection-listing"
            collection={otherProps.collection}
            entries={entries}
            viewStyle={viewStyle}
            cursor={cursor}
            handleCursorActions={handleCursorActions}
            page={page}
          />
        ) : (
          <EntryListing
            key="search-listing"
            collections={otherProps.collections}
            entries={entries}
            viewStyle={viewStyle}
            cursor={cursor}
            handleCursorActions={handleCursorActions}
            page={page}
          />
        )}
        {isFetching && page !== undefined && entries.length > 0 ? (
          <div>{t('collection.entries.loadingEntries')}</div>
        ) : null}
      </>
    );
  }

  return <div>{t('collection.entries.noEntries')}</div>;
};

export default translate()(Entries);
