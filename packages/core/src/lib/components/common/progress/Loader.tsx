import React, { useEffect, useMemo, useState } from 'react';

import CircularProgress from './CircularProgress';

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
    <div
      className="
        absolute
        inset-0
        flex
        flex-col
        gap-2
        items-center
        justify-center
        bg-slate-50
        dark:bg-slate-900
      "
    >
      <CircularProgress />
      <div>{text}</div>
    </div>
  );
};

export default Loader;
