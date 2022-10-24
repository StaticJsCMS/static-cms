import '../styles/globals.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Prism from 'prismjs';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import ColorModeContext from '../components/context/ColorModeContext';
import useCreateTheme from '../styles/theme';

import type { PaletteMode } from '@mui/material';
import type { AppProps } from 'next/app';

require('prismjs/components/prism-javascript');
require('prismjs/components/prism-css');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-yaml');
require('prismjs/components/prism-json');
require('prismjs/components/prism-toml');

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('palette-mode', newMode);
      },
    }),
    [mode],
  );

  useEffect(() => {
    setMode(localStorage?.getItem('palette-mode') === 'light' ? 'light' : 'dark');
  }, []);

  const { asPath } = useRouter();

  useEffect(() => {
    Prism.highlightAll();
  }, [asPath]);

  // Update the theme only if the mode changes
  const theme = useCreateTheme(mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
