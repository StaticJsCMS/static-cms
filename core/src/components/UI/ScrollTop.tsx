import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React, { useCallback } from 'react';

const StyledScrollTop = styled('div')`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

interface ScrollTopProps {
  children: React.ReactNode;
}

const ScrollTop = ({ children }: ScrollTopProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  }, []);

  return (
    <Fade in={trigger}>
      <StyledScrollTop onClick={handleClick} role="presentation">
        {children}
      </StyledScrollTop>
    </Fade>
  );
};

export default ScrollTop;
