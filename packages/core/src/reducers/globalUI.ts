import { THEME_CHANGE, USE_OPEN_AUTHORING } from '../constants';
import { isNotNullish } from '../lib/util/null.util';

import type { GlobalUIAction } from '../actions/globalUI';

export type GlobalUIState = {
  isFetching: boolean;
  useOpenAuthoring: boolean;
  theme: string;
};

function loadColorTheme(): string {
  const themeName = localStorage.getItem('color-theme');
  if (isNotNullish(themeName)) {
    return themeName;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

const defaultState: GlobalUIState = {
  isFetching: false,
  useOpenAuthoring: false,
  theme: loadColorTheme(),
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
    case USE_OPEN_AUTHORING:
      return {
        ...state,
        useOpenAuthoring: true,
      };
    case THEME_CHANGE:
      localStorage.setItem('color-theme', action.payload.toLowerCase());
      return {
        ...state,
        theme: action.payload.toLowerCase(),
      };
    default:
      return state;
  }
};

export default globalUI;
