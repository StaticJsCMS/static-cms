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
                main: '#3A69C7',
              },
            },
            typography: {
              fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
              h1: {
                fontSize: '42px',
                fontWeight: 'bold',
                color: '#3A69C7',
              },
            },
          })
        : createTheme({
            palette: {
              mode,
              primary: {
                main: '#3A69C7',
              },
            },
            typography: {
              fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
              h1: {
                fontSize: '42px',
                fontWeight: 'bold',
                color: '#4bc9fa',
              },
            },
          }),
    [mode],
  );
};

export default useCreateTheme;
