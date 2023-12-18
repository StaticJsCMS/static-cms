import type { Collection, Entry, TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './EntryCard.css';
export declare const classes: Record<"content" | "root" | "content-wrapper" | "card" | "card-content" | "card-summary" | "local-backup-icon", string>;
export interface EntryCardProps {
    entry: Entry;
    imageFieldName?: string | null | undefined;
    collection: Collection;
}
declare const EntryCard: FC<TranslatedProps<EntryCardProps>>;
export default EntryCard;
