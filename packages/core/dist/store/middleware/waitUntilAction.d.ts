import type { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
export interface WaitActionArgs {
    predicate: (action: AnyAction) => boolean;
    run: (dispatch: Dispatch, getState: () => any, action: AnyAction) => void;
}
export declare const waitUntilAction: Middleware<{}, any, Dispatch>;
