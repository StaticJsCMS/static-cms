import { useMemo } from 'react';

import { getThemes } from '@staticcms/core/lib/registry';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { DEFAULT_THEMES } from '../defaultThemes';
import createTheme from '../util/createTheme';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';

import type { Theme } from '@staticcms/core/interface';

export default function useThemes(): Theme[] {
  const config = useAppSelector(selectConfig);

  return useMemo(() => {
    const customThemes: Theme[] = [];

    if (customThemes.length === 0 || config?.theme?.include_standard_themes !== false) {
      customThemes.push(...DEFAULT_THEMES);
    }

    customThemes.push(
      ...[...(config?.theme?.themes ?? []), ...getThemes()].map(t =>
        'extends' in t ? createTheme(t) : t,
      ),
    );

    const defaultTheme = config?.theme?.default_theme;
    if (isNotEmpty(defaultTheme)) {
      customThemes.sort((a, b) => {
        if (a.name.toLowerCase() === defaultTheme.toLowerCase()) {
          return -1;
        }

        if (b.name.toLowerCase() === defaultTheme.toLowerCase()) {
          return 1;
        }

        return 0;
      });
    }

    return customThemes;
  }, [config?.theme?.default_theme, config?.theme?.include_standard_themes, config?.theme?.themes]);
}
