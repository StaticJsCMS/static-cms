/* eslint-disable import/prefer-default-export */
import { applyDefaults } from '@staticcms/core/actions/config';
import { resolveBackend } from '@staticcms/core/backend';

import type { BaseField, Config } from '@staticcms/core';

jest.mock('@staticcms/core/backend');

const mockResolveBackend = resolveBackend as jest.Mock;
mockResolveBackend.mockReturnValue({
  isGitBackend: () => true,
});

export const createMockConfig = <EF extends BaseField>(
  options: Omit<Partial<Config<EF>>, 'collections'> & Pick<Config<EF>, 'collections'>,
): Config<EF> =>
  applyDefaults({
    backend: {
      name: 'test-repo',
    },
    ...options,
  });
