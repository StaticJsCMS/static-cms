import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useMemo } from 'react';

import type { Theme } from '@staticcms/core/interface';
import type { FC, PropsWithChildren } from 'react';

export interface ThemeManagerProps {
  element: HTMLElement | undefined | null;
  theme: Theme;
}

const ThemeManager: FC<PropsWithChildren<ThemeManagerProps>> = ({ element, theme, children }) => {
  useEffect(() => {
    if (!element) {
      return;
    }

    element.style.setProperty('--text-primary', theme.text.primary);
    element.style.setProperty('--text-secondary', theme.text.secondary);
    element.style.setProperty('--text-disabled', theme.text.disabled);

    element.style.setProperty('--background-main', theme.background.main);
    element.style.setProperty('--background-light', theme.background.light);
    element.style.setProperty('--background-dark', theme.background.dark);
    element.style.setProperty('--background-divider', theme.background.divider);

    element.style.setProperty('--scrollbar-main', theme.scrollbar.main);
    element.style.setProperty('--scrollbar-light', theme.scrollbar.light);

    element.style.setProperty('--button-disabled', theme.button.disabled);

    element.style.setProperty('--primary-main', theme.primary.main);
    element.style.setProperty('--primary-light', theme.primary.light);
    element.style.setProperty('--primary-dark', theme.primary.dark);
    element.style.setProperty('--primary-contrast-color', theme.primary.contrastColor);

    element.style.setProperty('--secondary-main', theme.secondary.main);
    element.style.setProperty('--secondary-light', theme.secondary.light);
    element.style.setProperty('--secondary-dark', theme.secondary.dark);
    element.style.setProperty('--secondary-contrast-color', theme.secondary.contrastColor);

    element.style.setProperty('--error-main', theme.error.main);
    element.style.setProperty('--error-light', theme.error.light);
    element.style.setProperty('--error-dark', theme.error.dark);
    element.style.setProperty('--error-contrast-color', theme.error.contrastColor);

    element.style.setProperty('--warning-main', theme.warning.main);
    element.style.setProperty('--warning-light', theme.warning.light);
    element.style.setProperty('--warning-dark', theme.warning.dark);
    element.style.setProperty('--warning-contrast-color', theme.warning.contrastColor);

    element.style.setProperty('--info-main', theme.info.main);
    element.style.setProperty('--info-light', theme.info.light);
    element.style.setProperty('--info-dark', theme.info.dark);
    element.style.setProperty('--info-contrast-color', theme.info.contrastColor);

    element.style.setProperty('--success-main', theme.success.main);
    element.style.setProperty('--success-light', theme.success.light);
    element.style.setProperty('--success-dark', theme.success.dark);
    element.style.setProperty('--success-contrast-color', theme.success.contrastColor);
  }, [element, theme]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: theme.primary.main,
            light: theme.primary.light,
            dark: theme.primary.dark,
            contrastText: theme.primary.contrastColor,
          },
          secondary: {
            main: theme.secondary.main,
            light: theme.secondary.light,
            dark: theme.secondary.dark,
            contrastText: theme.secondary.contrastColor,
          },
          text: {
            primary: theme.text.primary,
            secondary: theme.text.secondary,
            disabled: theme.text.disabled,
          },
          action: {
            active: theme.text.primary,
          },
          background: {
            default: theme.background.dark,
            paper: theme.background.main,
          },
          error: {
            main: theme.error.main,
            light: theme.error.light,
            dark: theme.error.dark,
            contrastText: theme.error.contrastColor,
          },
          warning: {
            main: theme.warning.main,
            light: theme.warning.light,
            dark: theme.warning.dark,
            contrastText: theme.warning.contrastColor,
          },
          info: {
            main: theme.info.main,
            light: theme.info.light,
            dark: theme.info.dark,
            contrastText: theme.info.contrastColor,
          },
          success: {
            main: theme.success.main,
            light: theme.success.light,
            dark: theme.success.dark,
            contrastText: theme.success.contrastColor,
          },
        },
      }),
    [theme],
  );

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};

export default ThemeManager;
