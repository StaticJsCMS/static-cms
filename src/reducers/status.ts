import { produce } from 'immer';

import { STATUS_REQUEST, STATUS_SUCCESS, STATUS_FAILURE } from '../actions/status';

import type { StatusAction } from '../actions/status';

export interface StatusState {
  isFetching: boolean;
  status: {
    auth: { status: boolean };
    api: { status: boolean; statusPage: string };
  };
  error: Error | undefined;
}

const defaultState: StatusState = {
  isFetching: false,
  status: {
    auth: { status: true },
    api: { status: true, statusPage: '' },
  },
  error: undefined,
};

const status = produce((state: StatusState, action: StatusAction) => {
  switch (action.type) {
    case STATUS_REQUEST:
      state.isFetching = true;
      break;
    case STATUS_SUCCESS:
      state.isFetching = false;
      state.status = action.payload.status;
      break;
    case STATUS_FAILURE:
      state.isFetching = false;
      state.error = action.payload.error;
  }
}, defaultState);

export default status;
