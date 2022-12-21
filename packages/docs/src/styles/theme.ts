import darkScrollbar from '@mui/material/darkScrollbar';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

import type { Components, PaletteMode, PaletteOptions, Theme } from '@mui/material';

const useCreateTheme = (mode: PaletteMode) => {
  const theme = useMemo(() => createTheme(), []);

  const palette: PaletteOptions = useMemo(
    () =>
      mode === 'light'
        ? {
            mode,
            primary: {
              main: '#1b72de',
            },
            secondary: {
              main: '#1b72de',
            },
            background: {
              default: '#f9f9f9',
              paper: '#f9f9f9',
            },
          }
        : {
            mode,
            primary: {
              main: '#5ecffb',
            },
            secondary: {
              main: '#5ecffb',
            },
            background: {
              default: '#2e3034',
              paper: '#2e3034',
            },
          },
    [mode],
  );

  const components: Components<Omit<Theme, 'components'>> | undefined = useMemo(
    () =>
      mode === 'light'
        ? {}
        : {
            MuiCssBaseline: {
              styleOverrides: {
                body: darkScrollbar(),
              },
            },
          },
    [mode],
  );

  return useMemo(
    () =>
      createTheme({
        palette,
        typography: {
          fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
          h1: {
            fontSize: '42px',
            fontWeight: 'bold',
            lineHeight: 1.3,
            marginBottom: '16px',
            [theme.breakpoints.down('md')]: {
              fontSize: '30px',
            },
          },
          h2: {
            fontSize: '24px',
            lineHeight: 1.3,
            position: 'relative',
            [theme.breakpoints.down('md')]: {
              fontSize: '20px',
            },
          },
          h3: {
            fontSize: '20px',
            lineHeight: 1.3,
            position: 'relative',
            [theme.breakpoints.down('md')]: {
              fontSize: '18px',
            },
          },
        },
        components,
      }),
    [components, palette, theme.breakpoints],
  );
};

export default useCreateTheme;
