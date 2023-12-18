import type { AuthAction } from '../actions/auth';
import type { User } from '../interface';
export type AuthState = {
    isFetching: boolean;
    user: User | undefined;
    error: string | undefined;
};
export declare const defaultState: AuthState;
declare const auth: (state?: AuthState | undefined, action: AuthAction) => AuthState;
export default auth;
