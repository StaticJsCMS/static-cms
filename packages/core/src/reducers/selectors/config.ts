/* eslint-disable import/prefer-default-export */

import type { Config } from '@staticcms/core/interface';

export function selectLocale(config?: Config) {
  return config?.locale || 'en';
}
