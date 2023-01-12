import { CONFIG_FAILURE, CONFIG_REQUEST, CONFIG_SUCCESS } from '../constants';

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

const config = (state: ConfigState = defaultState, action: ConfigAction) => {
  switch (action.type) {
    case CONFIG_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CONFIG_SUCCESS:
      return {
        config: action.payload,
        isFetching: false,
        error: undefined,
      };
    case CONFIG_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.toString(),
      };

    default:
      return state;
  }
};

export default config;
