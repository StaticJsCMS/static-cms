import { useMemo } from 'react';

import { getThemes } from '@staticcms/core/lib/registry';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { DEFAULT_THEMES } from '../defaultThemes';

import type { Theme } from '@staticcms/core/interface';

export default function useThemes(): Theme[] {
  const config = useAppSelector(selectConfig);

  return useMemo(() => {
    const customThemes = [...(config?.theme?.themes ?? []), ...getThemes()];

    if (customThemes.length === 0 || config?.theme?.includeStandardThemes !== false) {
      customThemes.push(...DEFAULT_THEMES);
    }

    return customThemes;
  }, [config?.theme?.includeStandardThemes, config?.theme?.themes]);
}
