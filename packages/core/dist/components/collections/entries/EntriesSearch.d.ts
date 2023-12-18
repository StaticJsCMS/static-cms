import React from 'react';
import { clearSearch as clearSearchAction } from '@staticcms/core/actions/search';
import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Collections } from '@staticcms/core/interface';
import type { ConnectedProps } from 'react-redux';
interface EntriesSearchOwnProps {
    searchTerm: string;
    collections: Collections;
    viewStyle: ViewStyle;
}
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    isFetching: boolean;
    page: number;
    collections: Collections;
    viewStyle: ViewStyle;
    entries: import("@staticcms/core/interface").Entry<import("@staticcms/core/interface").ObjectValue>[];
    searchTerm: string;
} & {
    searchEntries: (searchTerm: string, searchCollections: string[], page?: number | undefined) => Promise<{
        readonly type: "SEARCH_ENTRIES_SUCCESS";
        readonly payload: {
            readonly entries: import("@staticcms/core/interface").Entry<import("@staticcms/core/interface").ObjectValue>[];
            readonly page: number;
        };
    } | {
        readonly type: "SEARCH_ENTRIES_FAILURE";
        readonly payload: {
            readonly error: Error;
        };
    } | undefined>;
    clearSearch: typeof clearSearchAction;
}, EntriesSearchOwnProps>;
export type EntriesSearchProps = ConnectedProps<typeof connector>;
declare const _default: import("react-redux").ConnectedComponent<({ collections, entries, isFetching, page, searchTerm, viewStyle, searchEntries, clearSearch, }: {
    isFetching: boolean;
    page: number;
    collections: Collections;
    viewStyle: ViewStyle;
    entries: import("@staticcms/core/interface").Entry<import("@staticcms/core/interface").ObjectValue>[];
    searchTerm: string;
} & {
    searchEntries: (searchTerm: string, searchCollections: string[], page?: number | undefined) => Promise<{
        readonly type: "SEARCH_ENTRIES_SUCCESS";
        readonly payload: {
            readonly entries: import("@staticcms/core/interface").Entry<import("@staticcms/core/interface").ObjectValue>[];
            readonly page: number;
        };
    } | {
        readonly type: "SEARCH_ENTRIES_FAILURE";
        readonly payload: {
            readonly error: Error;
        };
    } | undefined>;
    clearSearch: typeof clearSearchAction;
}) => JSX.Element, {
    searchTerm: string;
    collections: Collections;
    viewStyle: ViewStyle;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
