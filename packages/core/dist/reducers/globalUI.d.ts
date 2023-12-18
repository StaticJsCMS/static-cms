import type { GlobalUIAction } from '../actions/globalUI';
export type GlobalUIState = {
    isFetching: boolean;
    theme: 'dark' | 'light';
};
/**
 * Reducer for some global UI state that we want to share between components
 */
declare const globalUI: (state: GlobalUIState | undefined, action: GlobalUIAction) => GlobalUIState;
export default globalUI;
