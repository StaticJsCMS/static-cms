import React, { useEffect, useMemo, useState } from 'react';

import { selectConfig } from '../../reducers/selectors/config';
import { useAppSelector } from '../../store/hooks';
import { DEFAULT_THEMES } from './defaultThemes';
import { getThemes } from '@staticcms/core/lib/registry';

import type { FC, PropsWithChildren } from 'react';

const ThemeManager: FC<PropsWithChildren> = ({ children }) => {
  const config = useAppSelector(selectConfig);

  const themes = useMemo(() => {
    const customThemes = [...(config?.theme?.themes ?? []), ...getThemes()];

    if (customThemes.length === 0 || config?.theme?.includeStandardThemes !== false) {
      customThemes.push(...DEFAULT_THEMES);
    }

    return customThemes;
  }, [config?.theme?.includeStandardThemes, config?.theme?.themes]);

  const [themeName, setThemeName] = useState(
    config?.theme?.defaultTheme ?? themes[0].name ?? 'dark',
  );

  const theme = useMemo(
    () => themes.find(t => t.name === themeName) ?? DEFAULT_THEMES[0],
    [themes, themeName],
  );

  useEffect(() => {
    document.documentElement.style.setProperty('--text-primary', theme.text.primary);
    document.documentElement.style.setProperty('--primary-main', theme.primary.main);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeManager;
