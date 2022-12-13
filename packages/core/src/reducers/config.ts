import { produce } from 'immer';

import { CONFIG_FAILURE, CONFIG_REQUEST, CONFIG_SUCCESS } from '../actions/config';

import type { ConfigAction } from '../actions/config';
import type { Config } from '../interface';

export interface ConfigState {
  config?: Config;
  isFetching: boolean;
  error?: string;
}

const defaultState: ConfigState = {
  isFetching: true,
};

const config = produce((state: ConfigState, action: ConfigAction) => {
  switch (action.type) {
    case CONFIG_REQUEST:
      state.isFetching = true;
      break;
    case CONFIG_SUCCESS:
      return {
        config: action.payload,
        isFetching: false,
        error: undefined,
      };
    case CONFIG_FAILURE:
      state.isFetching = false;
      state.error = action.payload.toString();
  }
}, defaultState);

export function selectLocale(state?: Config) {
  return state?.locale || 'en';
}

export default config;
