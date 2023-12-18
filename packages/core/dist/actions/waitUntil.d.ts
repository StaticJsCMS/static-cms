import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';
import type { WaitActionArgs } from '../store/middleware/waitUntilAction';
export declare function waitUntil({ predicate, run }: WaitActionArgs): {
    type: string;
    predicate: (action: AnyAction) => boolean;
    run: (dispatch: import("redux").Dispatch<AnyAction>, getState: () => any, action: AnyAction) => void;
};
export declare function waitUntilWithTimeout<T>(dispatch: ThunkDispatch<RootState, {}, AnyAction>, waitActionArgs: (resolve: (value?: T) => void) => WaitActionArgs, timeout?: number): Promise<T | null | undefined>;
