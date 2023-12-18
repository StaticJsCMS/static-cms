import React from 'react';
import type { Collection, Entry } from '@staticcms/core/interface';
import type { ConnectedProps } from 'react-redux';
interface CollectionViewOwnProps {
    name: string;
    slug?: string;
    newRecord: boolean;
}
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    collection: Collection<import("@staticcms/core/interface").UnknownField>;
    collections: import("../../reducers/collections").CollectionsState<import("@staticcms/core/interface").UnknownField>;
    entryDraft: import("../../reducers/entryDraft").EntryDraftState;
    fields: import("@staticcms/core/interface").Field<import("@staticcms/core/interface").UnknownField>[];
    entry: Entry<import("@staticcms/core/interface").ObjectValue> | null;
    hasChanged: boolean;
    displayUrl: string | undefined;
    isModification: boolean;
    collectionEntriesLoaded: boolean;
    localBackup: {
        entry: Entry<import("@staticcms/core/interface").ObjectValue>;
    } | undefined;
    draftKey: string;
    scrollSyncActive: boolean;
    name: string;
    slug?: string | undefined;
    newRecord: boolean;
} & import("react-redux").DispatchProp<import("redux").AnyAction>, CollectionViewOwnProps>;
export type EditorProps = ConnectedProps<typeof connector>;
declare const _default: import("react-redux").ConnectedComponent<React.ComponentType<{
    collection: Collection<import("@staticcms/core/interface").UnknownField>;
    collections: import("../../reducers/collections").CollectionsState<import("@staticcms/core/interface").UnknownField>;
    entryDraft: import("../../reducers/entryDraft").EntryDraftState;
    fields: import("@staticcms/core/interface").Field<import("@staticcms/core/interface").UnknownField>[];
    entry: Entry<import("@staticcms/core/interface").ObjectValue> | null;
    hasChanged: boolean;
    displayUrl: string | undefined;
    isModification: boolean;
    collectionEntriesLoaded: boolean;
    localBackup: {
        entry: Entry<import("@staticcms/core/interface").ObjectValue>;
    } | undefined;
    draftKey: string;
    scrollSyncActive: boolean;
    name: string;
    slug?: string | undefined;
    newRecord: boolean;
} & import("react-redux").DispatchProp<import("redux").AnyAction>>, {
    name: string;
    slug?: string | undefined;
    newRecord: boolean;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
} | {
    ref?: React.LegacyRef<React.Component<{
        collection: Collection<import("@staticcms/core/interface").UnknownField>;
        collections: import("../../reducers/collections").CollectionsState<import("@staticcms/core/interface").UnknownField>;
        entryDraft: import("../../reducers/entryDraft").EntryDraftState;
        fields: import("@staticcms/core/interface").Field<import("@staticcms/core/interface").UnknownField>[];
        entry: Entry<import("@staticcms/core/interface").ObjectValue> | null;
        hasChanged: boolean;
        displayUrl: string | undefined;
        isModification: boolean;
        collectionEntriesLoaded: boolean;
        localBackup: {
            entry: Entry<import("@staticcms/core/interface").ObjectValue>;
        } | undefined;
        draftKey: string;
        scrollSyncActive: boolean;
        name: string;
        slug?: string | undefined;
        newRecord: boolean;
    } & import("react-redux").DispatchProp<import("redux").AnyAction>, any, any>> | undefined;
    key?: React.Key | null | undefined;
    css?: import("@emotion/serialize").Interpolation<import("@emotion/react").Theme>;
    name: string;
    slug?: string | undefined;
    newRecord: boolean;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
