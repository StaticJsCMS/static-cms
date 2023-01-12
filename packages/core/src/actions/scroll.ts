import { SCROLL_SYNC_ENABLED, SET_SCROLL, TOGGLE_SCROLL } from '../constants';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';

export function togglingScroll() {
  return {
    type: TOGGLE_SCROLL,
  } as const;
}

export function loadScroll() {
  return {
    type: SET_SCROLL,
    payload: localStorage.getItem(SCROLL_SYNC_ENABLED) !== 'false',
  } as const;
}

export function toggleScroll() {
  return async (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    _getState: () => RootState,
  ) => {
    return dispatch(togglingScroll());
  };
}

export type ScrollAction = ReturnType<typeof togglingScroll | typeof loadScroll>;
