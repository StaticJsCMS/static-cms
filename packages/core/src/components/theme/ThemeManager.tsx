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
    providedDocument.documentElement.style.setProperty('--primary-main', theme.primary.main);
  }, [providedDocument, theme]);

  return <>{children}</>;
};

export default ThemeManager;
