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
            },
            typography: {
              fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
              h1: {
                fontSize: '42px',
                fontWeight: 'bold'
              },
            },
          })
        : createTheme({
            palette: {
              mode,
              primary: {
                main: '#3A69C7',
              },
              secondary: {
                main: '#5ecffb',
              },
            },
            typography: {
              fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
              h1: {
                fontSize: '42px',
                fontWeight: 'bold'
              },
            },
          }),
    [mode],
  );
};

export default useCreateTheme;
