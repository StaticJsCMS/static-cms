import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Collection, Collections, Entry } from '@staticcms/core/interface';
import type Cursor from '@staticcms/core/lib/util/Cursor';
import type { FC } from 'react';
export interface BaseEntryListingProps {
    entries: Entry[];
    viewStyle: ViewStyle;
    cursor?: Cursor;
    isLoadingEntries: boolean;
    filterTerm: string;
    handleCursorActions?: (action: string) => void;
    page?: number;
}
export interface SingleCollectionEntryListingProps extends BaseEntryListingProps {
    collection: Collection;
}
export interface MultipleCollectionEntryListingProps extends BaseEntryListingProps {
    collections: Collections;
}
export type EntryListingProps = SingleCollectionEntryListingProps | MultipleCollectionEntryListingProps;
declare const EntryListing: FC<EntryListingProps>;
export default EntryListing;
