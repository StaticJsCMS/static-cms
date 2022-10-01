import { produce } from 'immer';

import { CONFIG_FAILURE, CONFIG_REQUEST, CONFIG_SUCCESS } from '../actions/config';

import type { ConfigAction } from '../actions/config';
import type { CmsConfig } from '../interface';

export interface ConfigState extends Partial<CmsConfig> {
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
        ...action.payload,
        isFetching: false,
        error: undefined,
      };
    case CONFIG_FAILURE:
      state.isFetching = false;
      state.error = action.payload.toString();
  }
}, defaultState);

export function selectLocale(state: CmsConfig) {
  return state.locale || 'en';
}

export default config;
