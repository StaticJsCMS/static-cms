import type { ScrollAction } from '../actions/scroll';
export interface ScrollState {
    isScrolling: boolean;
}
declare const status: (state?: ScrollState | undefined, action: ScrollAction) => ScrollState;
export default status;
