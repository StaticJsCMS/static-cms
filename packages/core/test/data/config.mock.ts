/* eslint-disable import/prefer-default-export */
import { applyDefaults } from '@staticcms/core/actions/config';

import type { BaseField, Config, ConfigWithDefaults } from '@staticcms/core';

export const createNoDefaultsMockConfig = <EF extends BaseField>(
  options: Omit<Partial<Config<EF>>, 'collections'> & Pick<Config<EF>, 'collections'>,
): Config<EF> => ({
  backend: {
    name: 'test-repo',
  },
  ...options,
});

export const createMockConfig = <EF extends BaseField>(
  options: Omit<Partial<Config<EF>>, 'collections'> & Pick<Config<EF>, 'collections'>,
): ConfigWithDefaults<EF> =>
  applyDefaults({
    backend: {
      name: 'test-repo',
    },
    ...options,
  });
