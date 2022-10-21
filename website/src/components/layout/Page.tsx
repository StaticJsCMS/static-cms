import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import useCreateTheme from '../../styles/theme';
import transientOptions from '../../util/transientOptions';
import BasicMeta from '../meta/BasicMeta';
import JsonLdMeta from '../meta/JsonLdMeta';
import OpenGraphMeta from '../meta/OpenGraphMeta';
import TwitterCardMeta from '../meta/TwitterCardMeta';
import Header from './Header';

import type { ReactNode } from 'react';

interface StyledPageContentWrapperProps {
  $mode: 'light' | 'dark';
}

const StyledPageContentWrapper = styled(
  'div',
  transientOptions,
)<StyledPageContentWrapperProps>(
  ({ $mode }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 64px);
    background-color: ${$mode === 'light' ? 'white' : '#3a404c'}
  `,
);

const StyledPageContent = styled('div')`
  max-width: 1280px;
  padding: 0 40px;
`;

export interface PageProps {
  title?: string;
  url: string;
  keywords?: string[];
  description?: string;
  children: ReactNode;
  pageDetails?: {
    date: Date;
    image?: string;
  };
}

const Page = ({ children, title, url, keywords, description, pageDetails }: PageProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const toggleColorMode = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('palette-mode', newMode);
  }, [mode]);

  const theme = useCreateTheme(mode);

  useLayoutEffect(() => {
    setMode(localStorage?.getItem('palette-mode') === 'light' ? 'light' : 'dark');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BasicMeta url={url} title={title} keywords={keywords} description={description} />
      <OpenGraphMeta url={url} title={title} image={pageDetails?.image} description={description} />
      <TwitterCardMeta
        url={url}
        title={title}
        image={pageDetails?.image}
        description={description}
      />
      {pageDetails ? (
        <JsonLdMeta
          url={url}
          title={title}
          keywords={keywords}
          date={pageDetails.date}
          image={pageDetails.image}
          description={description}
        />
      ) : null}
      <Header mode={theme.palette.mode} toggleColorMode={toggleColorMode} />
      <StyledPageContentWrapper $mode={mode}>
        <StyledPageContent>{children}</StyledPageContent>
      </StyledPageContentWrapper>
    </ThemeProvider>
  );
};

export default Page;
