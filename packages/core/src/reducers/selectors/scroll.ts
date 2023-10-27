/* eslint-disable import/prefer-default-export */
import type { RootState } from '@staticcms/core/store';

export const selectIsScrolling = (state: RootState) => {
  return state.scroll.isScrolling;
};
