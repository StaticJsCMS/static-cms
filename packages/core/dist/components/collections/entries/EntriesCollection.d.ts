import React from 'react';
import { Cursor } from '@staticcms/core/lib/util';
import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Collection, Entry } from '@staticcms/core/interface';
import type { ConnectedProps } from 'react-redux';
export declare function filterNestedEntries(path: string, collectionFolder: string, entries: Entry[]): Entry<import("@staticcms/core/interface").ObjectValue>[];
interface EntriesCollectionOwnProps {
    collection: Collection;
    viewStyle: ViewStyle;
    readyToLoad: boolean;
    filterTerm: string;
}
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    page: number | undefined;
    filterTerm: string;
    entriesLoaded: boolean;
    isFetching: boolean;
    viewStyle: ViewStyle;
    cursor: Cursor;
    collection: Collection;
    readyToLoad: boolean;
} & {}, EntriesCollectionOwnProps>;
export type EntriesCollectionProps = ConnectedProps<typeof connector>;
declare const _default: import("react-redux").ConnectedComponent<React.ComponentType<{
    page: number | undefined;
    filterTerm: string;
    entriesLoaded: boolean;
    isFetching: boolean;
    viewStyle: ViewStyle;
    cursor: Cursor;
    collection: Collection;
    readyToLoad: boolean;
} & {}>, {
    collection: Collection;
    viewStyle: ViewStyle;
    readyToLoad: boolean;
    filterTerm: string;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
} | {
    ref?: React.LegacyRef<React.Component<{
        page: number | undefined;
        filterTerm: string;
        entriesLoaded: boolean;
        isFetching: boolean;
        viewStyle: ViewStyle;
        cursor: Cursor;
        collection: Collection;
        readyToLoad: boolean;
    } & {}, any, any>> | undefined;
    key?: React.Key | null | undefined;
    css?: import("@emotion/serialize").Interpolation<import("@emotion/react").Theme>;
    collection: Collection;
    viewStyle: ViewStyle;
    readyToLoad: boolean;
    filterTerm: string;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
