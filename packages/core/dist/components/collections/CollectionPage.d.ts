import type { Collection } from '@staticcms/core/interface';
import type { FC } from 'react';
interface CollectionPageProps {
    collection?: Collection;
    isSearchResults?: boolean;
    isSingleSearchResult?: boolean;
}
declare const CollectionPage: FC<CollectionPageProps>;
export default CollectionPage;
