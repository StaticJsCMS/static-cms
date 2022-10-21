import { createTheme, styled, ThemeProvider } from '@mui/material/styles';

import Header from './Header';
import BasicMeta from '../meta/BasicMeta';
import TwitterCardMeta from '../meta/TwitterCardMeta';
import OpenGraphMeta from '../meta/OpenGraphMeta';
import JsonLdMeta from '../meta/JsonLdMeta';

import type { ReactNode } from 'react';

const StyledPageContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 64px);
`;

const StyledPageContent = styled('div')`
  max-width: 1280px;
`;

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A69C7',
    },
  },
});

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
  return (
    <ThemeProvider theme={theme}>
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
      <Header />
      <StyledPageContentWrapper>
        <StyledPageContent>{children}</StyledPageContent>
      </StyledPageContentWrapper>
    </ThemeProvider>
  );
};

export default Page;
