/* eslint-disable import/prefer-default-export */

import type { RootState } from '@staticcms/core/store';

export function selectIsLoadingAsset(state: RootState) {
  return Object.values(state.medias).some(state => state.isLoading);
}
