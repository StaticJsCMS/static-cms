import type { CollectionEntryData } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { t } from 'react-polyglot';
export interface EntryListingTableProps {
    isSingleCollectionInList: boolean;
    entryData: CollectionEntryData[];
    summaryFields: {
        name: string;
        label: string;
    }[];
    canLoadMore: boolean;
    isLoadingEntries: boolean;
    loadNext: () => void;
    t: t;
}
declare const EntryListingTable: FC<EntryListingTableProps>;
export default EntryListingTable;
