import { EDITORIAL_WORKFLOW } from '@staticcms/core/constants/publishModes';

import type { ConfigWithDefaults } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export function selectLocale(config?: ConfigWithDefaults) {
  return config?.locale || 'en';
}

export function selectConfig(state: RootState) {
  return state.config.config;
}
export function selectOriginConfig(state: RootState) {
  return state.config.originalConfig;
}

export function selectIsSearchEnabled(state: RootState) {
  return state.config.config?.search !== false;
}

export function selectDisplayUrl(state: RootState) {
  return state.config.config?.display_url;
}

export function getUseWorkflow(config?: ConfigWithDefaults) {
  return config?.publish_mode === EDITORIAL_WORKFLOW;
}

export function selectUseWorkflow(state: RootState) {
  return getUseWorkflow(state.config.config);
}
