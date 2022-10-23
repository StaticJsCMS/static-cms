import darkScrollbar from '@mui/material/darkScrollbar';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

import type { PaletteMode } from '@mui/material';

const useCreateTheme = (mode: PaletteMode) => {
  return useMemo(
    () =>
      mode === 'light'
        ? createTheme({
            palette: {
              mode,
              primary: {
                main: '#3764be',
              },
              secondary: {
                main: '#3764be',
              },
              background: {
                default: '#f9f9f9',
                paper: '#f9f9f9',
              },
            },
            typography: {
              fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
              h1: {
                fontSize: '42px',
                fontWeight: 'bold',
              },
            },
          })
        : createTheme({
            components: {
              MuiCssBaseline: {
                styleOverrides: {
                  body: darkScrollbar(),
                },
              },
            },
            palette: {
              mode,
              primary: {
                main: '#3A69C7',
              },
              secondary: {
                main: '#5ecffb',
              },
              background: {
                default: '#2e3034',
                paper: '#2e3034',
              },
            },
            typography: {
              fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
              h1: {
                fontSize: '42px',
                fontWeight: 'bold',
              },
            },
          }),
    [mode],
  );
};

export default useCreateTheme;
