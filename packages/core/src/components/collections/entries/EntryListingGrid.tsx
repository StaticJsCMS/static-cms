import React, { useCallback, useEffect, useRef } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { selectIsFetching } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import entriesClasses from './Entries.classes';
import EntryListingCardGrid from './EntryListingCardGrid';

import type { CollectionEntryData } from '@staticcms/core';
import type { FC } from 'react';

export interface EntryListingGridProps {
  entryData: CollectionEntryData[];
  canLoadMore?: boolean;
  isLoadingEntries: boolean;
  onLoadMore: () => void;
}

const EntryListingGrid: FC<EntryListingGridProps> = ({
  entryData,
  canLoadMore,
  isLoadingEntries,
  onLoadMore,
}) => {
  const t = useTranslate();

  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const isFetching = useAppSelector(selectIsFetching);

  const fetchMoreOnBottomReached = useCallback(
    (scrollHeight?: number, scrollTop?: number, clientHeight?: number) => {
      if (isNotNullish(scrollHeight) && isNotNullish(scrollTop) && isNotNullish(clientHeight)) {
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching && canLoadMore) {
          onLoadMore();
        }
      }
    },
    [isFetching, canLoadMore, onLoadMore],
  );

  const handleScroll = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = gridContainerRef.current ?? {};

    fetchMoreOnBottomReached(scrollHeight, scrollTop, clientHeight);
  }, [fetchMoreOnBottomReached]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [handleScroll]);

  return (
    <div className={entriesClasses['entry-listing-grid']}>
      <div ref={gridContainerRef} className={entriesClasses['entry-listing-grid-container']}>
        <EntryListingCardGrid
          key="grid"
          entryData={entryData}
          scrollContainerRef={gridContainerRef}
          onScroll={handleScroll}
        />
      </div>
      {isLoadingEntries ? (
        <div key="loading" className={entriesClasses['entry-listing-loading']}>
          {t('collection.entries.loadingEntries')}
        </div>
      ) : null}
    </div>
  );
};

export default EntryListingGrid;
