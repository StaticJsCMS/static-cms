import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { State } from '../interface';

export const SCROLL_SYNC_ENABLED = 'cms.scroll-sync-enabled';

export const TOGGLE_SCROLL = 'TOGGLE_SCROLL';
export const SET_SCROLL = 'SET_SCROLL';

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
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>, _getState: () => State) => {
    return dispatch(togglingScroll());
  };
}

export type ScrollAction = ReturnType<typeof togglingScroll | typeof loadScroll>;
