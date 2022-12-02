import { styled } from '@mui/material/styles';
import React from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

import { colors } from '@staticcms/core/components/UI/styles';
import Header from './Header';

import type { ReactNode } from 'react';

TopBarProgress.config({
  barColors: {
    0: colors.active,
    '1.0': colors.active,
  },
  shadowBlur: 0,
  barThickness: 2,
});

const StyledMainContainerWrapper = styled('div')`
  position: relative;
  padding: 24px;
  gap: 24px;
`;

const StyledMainContainer = styled('div')`
  min-width: 1152px;
  max-width: 1392px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  position: relative;
`;

interface MainViewProps {
  children: ReactNode;
}

const MainView = ({ children }: MainViewProps) => {
  return (
    <>
      <Header />
      <StyledMainContainerWrapper>
        <StyledMainContainer>{children}</StyledMainContainer>
      </StyledMainContainerWrapper>
    </>
  );
};

export default MainView;
