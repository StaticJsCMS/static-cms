import { THEME_CHANGE } from '../constants';

import type { GlobalUIAction } from '../actions/globalUI';

export type GlobalUIState = {
  isFetching: boolean;
  theme: string;
};

const defaultState: GlobalUIState = {
  isFetching: false,
  theme:
    localStorage.getItem('color-theme') ??
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light',
};

/**
 * Reducer for some global UI state that we want to share between components
 */
const globalUI = (state: GlobalUIState = defaultState, action: GlobalUIAction): GlobalUIState => {
  // Generic, global loading indicator
  if (action.type.includes('REQUEST')) {
    return {
      ...state,
      isFetching: true,
    };
  } else if (action.type.includes('SUCCESS') || action.type.includes('FAILURE')) {
    return {
      ...state,
      isFetching: false,
    };
  }

  switch (action.type) {
    case THEME_CHANGE:
      localStorage.setItem('color-theme', action.payload);
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default globalUI;
