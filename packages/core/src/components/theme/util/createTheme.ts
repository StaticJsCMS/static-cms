import { DARK_THEME, LIGHT_THEME } from '../defaultThemes';

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
      secondary: overrides?.text?.secondary ?? baseTheme.text.secondary,
      disabled: overrides?.text?.disabled ?? baseTheme.text.disabled,
    },
    background: {
      main: overrides?.background?.main ?? baseTheme.background.main,
      light: overrides?.background?.light ?? baseTheme.background.light,
      dark: overrides?.background?.dark ?? baseTheme.background.dark,
      divider: overrides?.background?.divider ?? baseTheme.background.divider,
    },
    scrollbar: {
      main: overrides?.scrollbar?.main ?? baseTheme.scrollbar.main,
      light: overrides?.scrollbar?.light ?? baseTheme.scrollbar.light,
    },
    button: {
      disabled: overrides?.button?.disabled ?? baseTheme.button.disabled,
    },
    primary: {
      main: overrides?.primary?.main ?? baseTheme.primary.main,
      light: overrides?.primary?.light ?? baseTheme.primary.light,
      dark: overrides?.primary?.dark ?? baseTheme.primary.dark,
      contrastColor: overrides?.primary?.contrastColor ?? baseTheme.primary.contrastColor,
    },
    secondary: {
      main: overrides?.secondary?.main ?? baseTheme.secondary.main,
      light: overrides?.secondary?.light ?? baseTheme.secondary.light,
      dark: overrides?.secondary?.dark ?? baseTheme.secondary.dark,
      contrastColor: overrides?.secondary?.contrastColor ?? baseTheme.secondary.contrastColor,
    },
    error: {
      main: overrides?.error?.main ?? baseTheme.error.main,
      light: overrides?.error?.light ?? baseTheme.error.light,
      dark: overrides?.error?.dark ?? baseTheme.error.dark,
      contrastColor: overrides?.error?.contrastColor ?? baseTheme.error.contrastColor,
    },
    warning: {
      main: overrides?.warning?.main ?? baseTheme.warning.main,
      light: overrides?.warning?.light ?? baseTheme.warning.light,
      dark: overrides?.warning?.dark ?? baseTheme.warning.dark,
      contrastColor: overrides?.warning?.contrastColor ?? baseTheme.warning.contrastColor,
    },
    info: {
      main: overrides?.info?.main ?? baseTheme.info.main,
      light: overrides?.info?.light ?? baseTheme.info.light,
      dark: overrides?.info?.dark ?? baseTheme.info.dark,
      contrastColor: overrides?.info?.contrastColor ?? baseTheme.info.contrastColor,
    },
    success: {
      main: overrides?.success?.main ?? baseTheme.success.main,
      light: overrides?.success?.light ?? baseTheme.success.light,
      dark: overrides?.success?.dark ?? baseTheme.success.dark,
      contrastColor: overrides?.success?.contrastColor ?? baseTheme.success.contrastColor,
    },
    codemirror: {
      theme: overrides?.codemirror?.theme ?? baseTheme.codemirror.theme,
    },
  };
}
