import React from 'react';
import { changeViewStyle as changeViewStyleAction } from '@staticcms/core/actions/entries';
import type { Collection, SortDirection, TranslatedProps, ViewFilter, ViewGroup } from '@staticcms/core/interface';
import type { ConnectedProps } from 'react-redux';
import './Collection.css';
interface CollectionViewOwnProps {
    isSearchResults?: boolean;
    isSingleSearchResult?: boolean;
    name?: string;
    searchTerm?: string;
    filterTerm?: string;
}
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    isSearchResults: boolean | undefined;
    isSingleSearchResult: boolean | undefined;
    name: string | undefined;
    searchTerm: string;
    filterTerm: string;
    collection: Collection | undefined;
    collections: import("../../reducers/collections").CollectionsState<import("@staticcms/core/interface").UnknownField>;
    sort: import("@staticcms/core/interface").SortMap | undefined;
    sortableFields: import("@staticcms/core/interface").SortableField[];
    viewFilters: ViewFilter[] | undefined;
    viewGroups: ViewGroup[] | undefined;
    filter: Record<string, import("@staticcms/core/interface").FilterMap>;
    group: Record<string, import("@staticcms/core/interface").GroupMap>;
    viewStyle: import("../../constants/views").ViewStyle;
} & {
    sortByField: (collection: Collection, key: string, direction?: SortDirection | undefined) => Promise<void>;
    filterByField: (collection: Collection, filter: ViewFilter) => Promise<void>;
    changeViewStyle: typeof changeViewStyleAction;
    groupByField: (collection: Collection, group: ViewGroup) => Promise<void>;
}, TranslatedProps<CollectionViewOwnProps>>;
export type CollectionViewProps = ConnectedProps<typeof connector>;
declare const _default: React.ComponentType<CollectionViewOwnProps>;
export default _default;
