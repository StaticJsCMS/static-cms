import { CONFIG_FAILURE, CONFIG_REQUEST, CONFIG_SUCCESS } from '../constants';

import type { ConfigAction } from '../actions/config';
import type { BaseField, Config, UnknownField } from '../interface';

export interface ConfigState<EF extends BaseField = UnknownField> {
  config?: Config<EF>;
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
