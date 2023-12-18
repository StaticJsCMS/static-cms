import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';
export declare function togglingScroll(): {
    readonly type: "TOGGLE_SCROLL";
};
export declare function loadScroll(): {
    readonly type: "SET_SCROLL";
    readonly payload: boolean;
};
export declare function toggleScroll(): (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, _getState: () => RootState) => Promise<{
    readonly type: "TOGGLE_SCROLL";
}>;
export type ScrollAction = ReturnType<typeof togglingScroll | typeof loadScroll>;
