import type { CollectionEntryData } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { t } from 'react-polyglot';
export interface EntryListingGridProps {
    entryData: CollectionEntryData[];
    canLoadMore?: boolean;
    isLoadingEntries: boolean;
    onLoadMore: () => void;
    t: t;
}
declare const EntryListingGrid: FC<EntryListingGridProps>;
export default EntryListingGrid;
