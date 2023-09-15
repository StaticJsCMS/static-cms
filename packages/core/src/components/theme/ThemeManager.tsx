import React, { useEffect } from 'react';

import useTheme from './hooks/useTheme';

import type { FC, PropsWithChildren } from 'react';

export interface ThemeManagerProps {
  document?: Document;
}

const ThemeManager: FC<PropsWithChildren<ThemeManagerProps>> = ({
  document: providedDocument = document,
  children,
}) => {
  const theme = useTheme();

  useEffect(() => {
    providedDocument.documentElement.style.setProperty('--text-primary', theme.text.primary);
    providedDocument.documentElement.style.setProperty('--text-secondary', theme.text.secondary);
    providedDocument.documentElement.style.setProperty('--text-disabled', theme.text.disabled);

    providedDocument.documentElement.style.setProperty('--background-main', theme.background.main);
    providedDocument.documentElement.style.setProperty(
      '--background-light',
      theme.background.light,
    );
    providedDocument.documentElement.style.setProperty('--background-dark', theme.background.dark);

    providedDocument.documentElement.style.setProperty('--button-disabled', theme.button.disabled);

    providedDocument.documentElement.style.setProperty('--primary-main', theme.primary.main);
    providedDocument.documentElement.style.setProperty('--primary-light', theme.primary.light);
    providedDocument.documentElement.style.setProperty('--primary-dark', theme.primary.dark);
    providedDocument.documentElement.style.setProperty(
      '--primary-contrast-color',
      theme.primary.contrastColor,
    );

    providedDocument.documentElement.style.setProperty('--secondary-main', theme.secondary.main);
    providedDocument.documentElement.style.setProperty('--secondary-light', theme.secondary.light);
    providedDocument.documentElement.style.setProperty('--secondary-dark', theme.secondary.dark);
    providedDocument.documentElement.style.setProperty(
      '--secondary-contrast-color',
      theme.secondary.contrastColor,
    );

    providedDocument.documentElement.style.setProperty('--error-main', theme.error.main);
    providedDocument.documentElement.style.setProperty('--error-light', theme.error.light);
    providedDocument.documentElement.style.setProperty('--error-dark', theme.error.dark);
    providedDocument.documentElement.style.setProperty(
      '--error-contrast-color',
      theme.error.contrastColor,
    );

    providedDocument.documentElement.style.setProperty('--warning-main', theme.warning.main);
    providedDocument.documentElement.style.setProperty('--warning-light', theme.warning.light);
    providedDocument.documentElement.style.setProperty('--warning-dark', theme.warning.dark);
    providedDocument.documentElement.style.setProperty(
      '--warning-contrast-color',
      theme.warning.contrastColor,
    );

    providedDocument.documentElement.style.setProperty('--info-main', theme.info.main);
    providedDocument.documentElement.style.setProperty('--info-light', theme.info.light);
    providedDocument.documentElement.style.setProperty('--info-dark', theme.info.dark);
    providedDocument.documentElement.style.setProperty(
      '--info-contrast-color',
      theme.info.contrastColor,
    );

    providedDocument.documentElement.style.setProperty('--success-main', theme.success.main);
    providedDocument.documentElement.style.setProperty('--success-light', theme.success.light);
    providedDocument.documentElement.style.setProperty('--success-dark', theme.success.dark);
    providedDocument.documentElement.style.setProperty(
      '--success-contrast-color',
      theme.success.contrastColor,
    );
  }, [providedDocument, theme]);

  return <>{children}</>;
};

export default ThemeManager;
