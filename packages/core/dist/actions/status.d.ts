import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';
export declare function statusRequest(): {
    readonly type: "STATUS_REQUEST";
};
export declare function statusSuccess(status: {
    auth: {
        status: boolean;
    };
    api: {
        status: boolean;
        statusPage: string;
    };
}): {
    readonly type: "STATUS_SUCCESS";
    readonly payload: {
        readonly status: {
            auth: {
                status: boolean;
            };
            api: {
                status: boolean;
                statusPage: string;
            };
        };
    };
};
export declare function statusFailure(error: Error): {
    readonly type: "STATUS_FAILURE";
    readonly payload: {
        readonly error: Error;
    };
};
export declare function checkBackendStatus(): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<{
    readonly type: "STATUS_SUCCESS";
    readonly payload: {
        readonly status: {
            auth: {
                status: boolean;
            };
            api: {
                status: boolean;
                statusPage: string;
            };
        };
    };
} | undefined>;
export type StatusAction = ReturnType<typeof statusRequest | typeof statusSuccess | typeof statusFailure>;
