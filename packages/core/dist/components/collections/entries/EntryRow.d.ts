import type { Collection, Entry, TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';
export interface EntryRowProps {
    entry: Entry;
    collection: Collection;
    collectionLabel?: string;
    columnFields: string[];
}
declare const EntryRow: FC<TranslatedProps<EntryRowProps>>;
export default EntryRow;
