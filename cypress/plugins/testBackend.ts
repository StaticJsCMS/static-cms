import merge from 'lodash/merge';
import { updateConfig } from '../utils/config';

import type { Config } from '@staticcms/core/interface';
import type { SetupBackendResponse } from '../interface';

export async function setupTestBackend(options: Partial<Config>): Promise<SetupBackendResponse> {
  await updateConfig(current => {
    merge(current, options);
  });

  return null;
}
