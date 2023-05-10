/* eslint-disable import/prefer-default-export */
import { applyDefaults } from '@staticcms/core/actions/config';

import type { BaseField, Config } from '@staticcms/core';

export const createMockConfig = <EF extends BaseField>(
  options: Omit<Partial<Config<EF>>, 'collections'> & Pick<Config<EF>, 'collections'>,
): Config<EF> =>
  applyDefaults({
    backend: {
      name: 'test-repo',
    },
    ...options,
  });
