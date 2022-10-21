import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import Header from './Header';

export interface PageProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A69C7'
    },
  },
});

const Page = ({ children }: PageProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
    </ThemeProvider>
  );
};

export default Page;
