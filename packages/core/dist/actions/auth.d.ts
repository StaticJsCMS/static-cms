import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { Credentials, User } from '../interface';
import type { RootState } from '../store';
export declare function authenticating(): {
    readonly type: "AUTH_REQUEST";
};
export declare function authenticate(userData: User): {
    readonly type: "AUTH_SUCCESS";
    readonly payload: User;
};
export declare function authError(error: Error): {
    readonly type: "AUTH_FAILURE";
    readonly error: "Failed to authenticate";
    readonly payload: Error;
};
export declare function doneAuthenticating(): {
    readonly type: "AUTH_REQUEST_DONE";
};
export declare function logout(): {
    readonly type: "LOGOUT";
};
export declare function authenticateUser(): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void> | undefined;
export declare function loginUser(credentials: Credentials): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void> | undefined;
export declare function logoutUser(): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => void;
export type AuthAction = ReturnType<typeof authenticating | typeof authenticate | typeof authError | typeof doneAuthenticating | typeof logout>;
