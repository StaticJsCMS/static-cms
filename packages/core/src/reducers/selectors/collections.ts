import { createSelector } from '@reduxjs/toolkit';

import type { BaseField, CollectionWithDefaults, UnknownField } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export const selectCollections = <EF extends BaseField = UnknownField>(state: RootState<EF>) => {
  return state.collections;
};

export const selectCollection = createSelector(
  [selectCollections, (_state: RootState, collectionName: string | undefined) => collectionName],
  (collections, collectionName): CollectionWithDefaults | undefined => {
    if (!collectionName) {
      return undefined;
    }

    return Object.values(collections).find(collection => collection.name === collectionName);
  },
);
