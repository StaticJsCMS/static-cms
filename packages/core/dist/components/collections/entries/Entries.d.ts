import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Collection, Collections, Entry } from '@staticcms/core/interface';
import type Cursor from '@staticcms/core/lib/util/Cursor';
import './Entries.css';
export interface BaseEntriesProps {
    entries: Entry[];
    page?: number;
    isFetching: boolean;
    viewStyle: ViewStyle;
    cursor: Cursor;
    filterTerm: string;
    handleCursorActions?: (action: string) => void;
}
export interface SingleCollectionEntriesProps extends BaseEntriesProps {
    collection: Collection;
}
export interface MultipleCollectionEntriesProps extends BaseEntriesProps {
    collections: Collections;
}
export type EntriesProps = SingleCollectionEntriesProps | MultipleCollectionEntriesProps;
declare const _default: any;
export default _default;
