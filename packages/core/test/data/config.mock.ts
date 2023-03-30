/* eslint-disable import/prefer-default-export */
import type { BaseField, Config } from '@staticcms/core';

export const createMockConfig = <EF extends BaseField>(
  options: Omit<Partial<Config<EF>>, 'collections'> & Pick<Config<EF>, 'collections'>,
): Config<EF> => ({
  backend: {
    name: 'test-repo',
  },
  ...options,
});
