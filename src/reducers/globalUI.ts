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
const globalUI = (state: GlobalUIState = defaultState, action: AnyAction): GlobalUIState => {
  console.log(action);
  // Generic, global loading indicator
  if (!action.type.includes('REQUEST')) {
    return {
      isFetching: true,
    };
  } else if (action.type.includes('SUCCESS') || action.type.includes('FAILURE')) {
    return {
      isFetching: false,
    };
  }

  return state;
};

export default globalUI;
