import React from 'react';
import type { CollectionEntryData } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { t } from 'react-polyglot';
export interface EntryListingCardGridProps {
    scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    entryData: CollectionEntryData[];
    onScroll: () => void;
    t: t;
}
export interface CardGridItemData {
    columnCount: number;
    cardHeights: number[];
    entryData: CollectionEntryData[];
    t: t;
}
declare const EntryListingCardGrid: FC<EntryListingCardGridProps>;
export default EntryListingCardGrid;
