import { darken, lighten } from '@mui/material/styles';

import { DARK_THEME, LIGHT_THEME } from '../defaultThemes';

import type { PartialTheme, Theme, ThemeColor } from '@staticcms/core/interface';

function createDarkColor(
  color: string | undefined,
  main: string | undefined,
  base: string,
): string {
  if (color) {
    return color;
  }

  if (main) {
    return darken(main, 0.125);
  }

  return base;
}

function createLightColor(
  color: string | undefined,
  main: string | undefined,
  base: string,
): string {
  if (color) {
    return color;
  }

  if (main) {
    return lighten(main, 0.125);
  }

  return base;
}

function createThemeColor(overrides: Partial<ThemeColor> | undefined, base: ThemeColor) {
  return {
    main: overrides?.main ?? base.main,
    light: createLightColor(overrides?.light, overrides?.main, base.light),
    dark: createDarkColor(overrides?.dark, overrides?.main, base.dark),
    contrastColor: overrides?.contrastColor ?? base.contrastColor,
  };
}

export default function createTheme(overrides: PartialTheme): Theme {
  const baseTheme = overrides.extends === 'light' ? LIGHT_THEME : DARK_THEME;

  return {
    name: overrides.name,
    common: {
      gray: overrides.common?.gray ?? baseTheme.common.gray,
    },
    text: {
      primary: overrides.text?.primary ?? baseTheme.text.primary,
      secondary: overrides.text?.secondary ?? baseTheme.text.secondary,
      disabled: overrides.text?.disabled ?? baseTheme.text.disabled,
    },
    background: {
      main: overrides.background?.main ?? baseTheme.background.main,
      light: createLightColor(
        overrides.background?.light,
        overrides.background?.main,
        baseTheme.background.light,
      ),
      dark: createDarkColor(
        overrides.background?.dark,
        overrides.background?.main,
        baseTheme.background.dark,
      ),
      divider: overrides.background?.divider ?? baseTheme.background.divider,
    },
    scrollbar: {
      main: overrides.scrollbar?.main ?? baseTheme.scrollbar.main,
      light: createLightColor(
        overrides.scrollbar?.light,
        overrides.scrollbar?.main,
        baseTheme.scrollbar.light,
      ),
    },
    primary: createThemeColor(overrides.primary, baseTheme.primary),
    error: createThemeColor(overrides.error, baseTheme.error),
    warning: createThemeColor(overrides.warning, baseTheme.warning),
    info: createThemeColor(overrides.info, baseTheme.info),
    success: createThemeColor(overrides.success, baseTheme.success),
    codemirror: {
      theme: overrides.codemirror?.theme ?? baseTheme.codemirror.theme,
    },
  };
}
