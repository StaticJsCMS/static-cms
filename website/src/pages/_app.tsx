import '../styles/globals.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import { useEffect, useMemo, useState } from 'react';

import ColorModeContext from '../components/context/ColorModeContext';
import homepageData from '../lib/homepage';
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
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#2e3034" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="description" content={homepageData.title} />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default MyApp;
