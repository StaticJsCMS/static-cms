import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@staticcms/core/store';

export function selectMedias(state: RootState) {
  return state.medias;
}

export const selectIsLoadingAsset = createSelector([selectMedias], medias => {
  return Object.values(medias).some(state => state.isLoading);
});
