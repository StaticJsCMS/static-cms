/* eslint-disable import/prefer-default-export */
import type { RootState } from '@staticcms/core/store';

export const selectCollection = (collectionName: string) => (state: RootState) => {
  return Object.values(state.collections).find(collection => collection.name === collectionName);
};
