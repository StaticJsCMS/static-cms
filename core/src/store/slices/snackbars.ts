import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

type MessageType = 'error' | 'warning' | 'info' | 'success';

export interface SnackbarMessage {
  id: string;
  type: MessageType;
  message:
    | string
    | ({
        key: string;
      } & Record<string, unknown>);
}

// Define a type for the slice state
export interface SnackbarState {
  messages: SnackbarMessage[];
}

// Define the initial state using that type
const initialState: SnackbarState = {
  messages: [],
};

export const SnackbarSlice = createSlice({
  name: 'snackbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addSnackbar: (state, action: PayloadAction<Omit<SnackbarMessage, 'id'>>) => {
      state.messages.push({
        id: uuid(),
        ...action.payload,
      });
    },
    removeSnackbarById: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    },
  },
});

export const { addSnackbar, removeSnackbarById } = SnackbarSlice.actions;

export const selectSnackbars = (state: RootState) => state.snackbar.messages;

export default SnackbarSlice.reducer;
