import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
type MessageType = 'error' | 'warning' | 'info' | 'success';
export interface SnackbarMessage {
    id: string;
    type: MessageType;
    message: string | {
        key: string;
        options?: Record<string, unknown>;
    };
}
export interface SnackbarState {
    messages: SnackbarMessage[];
}
export declare const SnackbarSlice: import("@reduxjs/toolkit").Slice<SnackbarState, {
    addSnackbar: (state: import("immer/dist/internal").WritableDraft<SnackbarState>, action: PayloadAction<Omit<SnackbarMessage, 'id'>>) => void;
    removeSnackbarById: (state: import("immer/dist/internal").WritableDraft<SnackbarState>, action: PayloadAction<string>) => void;
}, "snackbar">;
export declare const addSnackbar: import("@reduxjs/toolkit").ActionCreatorWithPayload<Omit<SnackbarMessage, "id">, "snackbar/addSnackbar">, removeSnackbarById: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "snackbar/removeSnackbarById">;
export declare const selectSnackbars: (state: RootState) => SnackbarMessage[];
declare const _default: import("redux").Reducer<SnackbarState>;
export default _default;
