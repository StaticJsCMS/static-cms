import { produce } from 'immer';

import type { AnyAction } from 'redux';

export type GlobalUIState = {
  isFetching: boolean;
};

const defaultState: GlobalUIState = {
  isFetching: false,
};

/**
 * Reducer for some global UI state that we want to share between components
 */
const globalUI = produce((state: GlobalUIState, action: AnyAction) => {
  // Generic, global loading indicator
  if (!action.type.includes('REQUEST')) {
    state.isFetching = true;
  } else if (action.type.includes('SUCCESS') || action.type.includes('FAILURE')) {
    state.isFetching = false;
  }
}, defaultState);

export default globalUI;
