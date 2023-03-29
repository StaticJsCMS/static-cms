import React from 'react';
import { Link } from 'react-router-dom';

import type { ReactNode } from 'react';

interface CardActionAreaProps {
  to: string;
  children: ReactNode;
}

const CardActionArea = ({ to, children }: CardActionAreaProps) => {
  return (
    <Link
      to={to}
      className="
        h-full
        w-full
        relative
        flex
        justify-start
        hover:bg-gray-200
        dark:hover:bg-slate-700/70
      "
    >
      {children}
    </Link>
  );
};

export default CardActionArea;
