import { useMemo } from 'react';

import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { DEFAULT_THEMES } from '../defaultThemes';
import useThemes from './useThemes';

import type { Theme } from '@staticcms/core';

export default function useTheme(): Theme {
  const themes = useThemes();

  const themeName = useAppSelector(selectTheme);

  return useMemo(
    () => themes.find(t => t.name.toLowerCase() === themeName) ?? DEFAULT_THEMES[0],
    [themes, themeName],
  );
}
