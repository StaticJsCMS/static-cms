import type { StatusAction } from '../actions/status';
export interface StatusState {
    isFetching: boolean;
    status: {
        auth: {
            status: boolean;
        };
        api: {
            status: boolean;
            statusPage: string;
        };
    };
    error: Error | undefined;
}
declare const status: (state?: StatusState | undefined, action: StatusAction) => StatusState;
export default status;
