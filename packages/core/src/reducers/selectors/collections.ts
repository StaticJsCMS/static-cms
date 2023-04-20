/* eslint-disable import/prefer-default-export */
import type { BaseField, UnknownField } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export const selectCollections = <EF extends BaseField = UnknownField>(state: RootState<EF>) => {
  return state.collections;
};

export const selectCollection =
  <EF extends BaseField = UnknownField>(collectionName: string | undefined) =>
  (state: RootState<EF>) => {
    return Object.values(state.collections).find(collection => collection.name === collectionName);
  };
