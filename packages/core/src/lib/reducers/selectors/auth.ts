/* eslint-disable import/prefer-default-export */
import type { RootState } from '@staticcms/core/store';

export const selectUser = (state: RootState) => {
  return state.auth.user;
};
