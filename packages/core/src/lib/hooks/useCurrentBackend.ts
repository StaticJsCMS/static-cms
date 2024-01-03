import { useMemo } from 'react';

import { currentBackend } from '@staticcms/core/backend';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { Backend } from '@staticcms/core/backend';

export default function useCurrentBackend(): Backend | undefined {
  const config = useAppSelector(selectConfig);

  return useMemo(() => {
    if (!config) {
      return undefined;
    }

    return currentBackend(config);
  }, [config]);
}
