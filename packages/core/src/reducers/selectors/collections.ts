/* eslint-disable import/prefer-default-export */
import type { RootState } from '@staticcms/core/store';

export const selectCollections = (state: RootState) => {
  return state.collections;
};

export const selectCollection = (collectionName: string | undefined) => (state: RootState) => {
  return Object.values(state.collections).find(collection => collection.name === collectionName);
};
