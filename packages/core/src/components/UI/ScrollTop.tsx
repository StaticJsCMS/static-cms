import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React, { useCallback } from 'react';

import type { MouseEvent, ReactNode } from 'react';

interface ScrollTopProps {
  children: ReactNode;
}

const ScrollTop = ({ children }: ScrollTopProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
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
      <div onClick={handleClick} role="presentation">
        {children}
      </div>
    </Fade>
  );
};

export default ScrollTop;
