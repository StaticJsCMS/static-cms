import { styled } from '@mui/material/styles';

import type { ReactNode } from 'react';

const StyledContainer = styled('div')`
  max-width: 1280px;
  width: 100%;
  padding: 0 40px;
`;

export interface PageProps {
  children: ReactNode;
}

const Container = ({ children }: PageProps) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
