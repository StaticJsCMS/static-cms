import type { BaseField, UnknownField } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
export declare const selectCollections: <EF extends BaseField = UnknownField>(state: RootState<EF>) => import("../collections").CollectionsState<UnknownField>;
export declare const selectCollection: <EF extends BaseField = UnknownField>(collectionName: string | undefined) => (state: RootState<EF>) => import("@staticcms/core/interface").Collection<UnknownField> | undefined;
