import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useRef } from 'react';

import ColorModeContext from '../context/ColorModeContext';
import BasicMeta from '../meta/BasicMeta';
import JsonLdMeta from '../meta/JsonLdMeta';
import OpenGraphMeta from '../meta/OpenGraphMeta';
import TwitterCardMeta from '../meta/TwitterCardMeta';
import Container from './Container';
import Header from './Header';

import type { ReactNode } from 'react';
import type { DocsGroup, SearchablePage } from '../../interface';

const StyledPageContentWrapper = styled('div')`
  display: block;
  height: calc(100vh - 72px);
  width: 100%;
  position: relative;
  top: 72px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export interface PageProps {
  title?: string;
  url: string;
  keywords?: string[];
  description?: string;
  children: ReactNode;
  pageDetails?: {
    date?: Date;
    image?: string;
  };
  fullWidth?: boolean;
  docsGroups: DocsGroup[];
  searchablePages: SearchablePage[];
}

const Page = ({
  children,
  title,
  url,
  keywords,
  description,
  pageDetails,
  fullWidth = false,
  docsGroups,
  searchablePages,
}: PageProps) => {
  const scrollableArea = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { asPath } = useRouter();

  const content = useMemo(() => {
    if (fullWidth) {
      return children;
    }

    return <Container>{children}</Container>;
  }, [children, fullWidth]);

  useEffect(() => {
    if (!asPath.includes('#')) {
      scrollableArea.current?.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, [asPath]);

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
      <Header
        mode={theme.palette.mode}
        docsGroups={docsGroups}
        searchablePages={searchablePages}
        toggleColorMode={colorMode.toggleColorMode}
      />
      <StyledPageContentWrapper ref={scrollableArea}>{content}</StyledPageContentWrapper>
    </ThemeProvider>
  );
};

export default Page;
