import React from 'react';
import type { Credentials } from '@staticcms/core/interface';
import type { ConnectedProps } from 'react-redux';
import './App.css';
export declare const classes: Record<"content" | "root", string>;
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    auth: import("../reducers/auth").AuthState;
    config: import("../reducers/config").ConfigState<import("@staticcms/core/interface").UnknownField>;
    collections: import("../reducers/collections").CollectionsState<import("@staticcms/core/interface").UnknownField>;
    user: import("@staticcms/core/interface").User | undefined;
    isFetching: boolean;
    scrollSyncEnabled: boolean;
} & {
    loginUser: (credentials: Credentials) => Promise<void> | undefined;
}, {}>;
export type AppProps = ConnectedProps<typeof connector>;
declare const _default: import("react-redux").ConnectedComponent<React.ComponentType<{
    auth: import("../reducers/auth").AuthState;
    config: import("../reducers/config").ConfigState<import("@staticcms/core/interface").UnknownField>;
    collections: import("../reducers/collections").CollectionsState<import("@staticcms/core/interface").UnknownField>;
    user: import("@staticcms/core/interface").User | undefined;
    isFetching: boolean;
    scrollSyncEnabled: boolean;
} & {
    loginUser: (credentials: Credentials) => Promise<void> | undefined;
}>, {
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
} | {
    ref?: React.LegacyRef<React.Component<{
        auth: import("../reducers/auth").AuthState;
        config: import("../reducers/config").ConfigState<import("@staticcms/core/interface").UnknownField>;
        collections: import("../reducers/collections").CollectionsState<import("@staticcms/core/interface").UnknownField>;
        user: import("@staticcms/core/interface").User | undefined;
        isFetching: boolean;
        scrollSyncEnabled: boolean;
    } & {
        loginUser: (credentials: Credentials) => Promise<void> | undefined;
    }, any, any>> | undefined;
    key?: React.Key | null | undefined;
    css?: import("@emotion/serialize").Interpolation<import("@emotion/react").Theme>;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
