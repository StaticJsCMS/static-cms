import { produce } from 'immer';

import type { AnyAction } from 'redux';

export type GlobalUI = {
  isFetching: boolean;
};

const defaultState: GlobalUI = {
  isFetching: false,
};

/**
 * Reducer for some global UI state that we want to share between components
 */
const globalUI = produce((state: GlobalUI, action: AnyAction) => {
  // Generic, global loading indicator
  if (!action.type.includes('REQUEST')) {
    state.isFetching = true;
  } else if (action.type.includes('SUCCESS') || action.type.includes('FAILURE')) {
    state.isFetching = false;
  }
}, defaultState);

export default globalUI;
