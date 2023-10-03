import React, { useEffect, useMemo, useState } from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import CircularProgress from './CircularProgress';

import type { FC } from 'react';

import './Loader.css';

export const classes = generateClassNames('Loader', ['root']);

export interface LoaderProps {
  children: string | string[] | undefined;
}

const Loader: FC<LoaderProps> = ({ children }) => {
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
    <div className={classes.root}>
      <CircularProgress />
      <div>{text}</div>
    </div>
  );
};

export default Loader;
