import { DARK_THEME, LIGHT_THEME } from './defaultThemes';

import type { DeepPartial, Theme } from '@staticcms/core/interface';

export default function createTheme(
  name: string,
  overrides: DeepPartial<Theme>,
  extendFrom: 'dark' | 'light' = 'light',
): Theme {
  const baseTheme = extendFrom === 'light' ? LIGHT_THEME : DARK_THEME;

  return {
    name,
    text: {
      primary: overrides?.text?.primary ?? baseTheme.text.primary,
      emphasis: overrides?.text?.emphasis ?? baseTheme.text.emphasis,
    },
    primary: {
      main: overrides?.primary?.main ?? baseTheme.primary.main,
    },
  };
}
