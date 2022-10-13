import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useState } from 'react';

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
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <Typography>{text}</Typography>
    </Box>
  );
};

export default Loader;
