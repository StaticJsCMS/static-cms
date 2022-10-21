import { createTheme, styled, ThemeProvider } from '@mui/material/styles';

import Header from './Header';

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

export interface PageProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A69C7',
    },
  },
});

const Page = ({ children }: PageProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <StyledPageContentWrapper>
        <StyledPageContent>{children}</StyledPageContent>
      </StyledPageContentWrapper>
    </ThemeProvider>
  );
};

export default Page;
