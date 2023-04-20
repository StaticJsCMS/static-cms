import { THEME_CHANGE } from '../constants';

import type { GlobalUIAction } from '../actions/globalUI';

export type GlobalUIState = {
  isFetching: boolean;
  theme: 'dark' | 'light';
};

const defaultState: GlobalUIState = {
  isFetching: false,
  theme: 'light',
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
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default globalUI;
