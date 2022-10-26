import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useState } from 'react';

const StyledLoader = styled('div')`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export interface LoaderProps {
  children: string | string[] | undefined;
}

const Loader = ({ children }: LoaderProps) => {
  const [currentItem, setCurrentItem] = useState(0);

  const text = useMemo(() => {
    if (!children) {
      return undefined;
    } else if (typeof children == 'string') {
      return children;
    } else if (Array.isArray(children)) {
      return currentItem < children.length ? children[currentItem] : undefined;
    }
  }, [children, currentItem]);

  useEffect(() => {
    if (!Array.isArray(children)) {
      return;
    }

    const timer = setInterval(() => {
      const nextItem = currentItem === children?.length - 1 ? 0 : currentItem + 1;
      setCurrentItem(nextItem);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [children, currentItem]);

  return (
    <StyledLoader>
      <CircularProgress />
      <Typography>{text}</Typography>
    </StyledLoader>
  );
};

export default Loader;
