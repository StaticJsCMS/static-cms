import type { RootState } from '@staticcms/core/store';

export function selectIsFetching(state: RootState) {
  return state.globalUI.isFetching;
}

export function selectTheme(state: RootState) {
  return state.globalUI.theme;
}

export function selectUseOpenAuthoring(state: RootState) {
  return state.globalUI.useOpenAuthoring;
}
