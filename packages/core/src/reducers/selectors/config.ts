import { createSelector } from '@reduxjs/toolkit';

import { EDITORIAL_WORKFLOW } from '@staticcms/core/constants/publishModes';

import type { Workflow } from '@staticcms/core/constants/publishModes';
import type { ConfigWithDefaults } from '@staticcms/core';
import type { RootState } from '@staticcms/core/store';

export function selectLocale(config?: ConfigWithDefaults) {
  return config?.locale ?? 'en';
}

export function selectConfig(state: RootState) {
  return state.config.config;
}
export function selectOriginConfig(state: RootState) {
  return state.config.originalConfig;
}

export function selectSearch(state: RootState) {
  return state.config.config?.search;
}

export const selectIsSearchEnabled = createSelector(
  [selectSearch],
  (search: boolean | undefined) => {
    return search !== false;
  },
);

export function selectDisplayUrl(state: RootState) {
  return state.config.config?.display_url;
}

export function getUseWorkflow(config?: ConfigWithDefaults) {
  return config?.publish_mode === EDITORIAL_WORKFLOW;
}

export function selectPublishMode(state: RootState) {
  return state.config.config?.publish_mode;
}

export const selectUseWorkflow = createSelector(
  [selectPublishMode],
  (publish_mode: Workflow | undefined) => {
    return publish_mode === EDITORIAL_WORKFLOW;
  },
);
