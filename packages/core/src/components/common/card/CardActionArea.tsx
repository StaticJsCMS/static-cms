import React from 'react';
import { Link } from 'react-router-dom';

import type { ReactNode } from 'react';

interface CardActionAreaProps {
  to: string;
  children: ReactNode;
}

const CardActionArea = ({ to, children }: CardActionAreaProps) => {
  return (
    <Link to={to} className="h-full w-full relative flex justify-start">
      {children}
    </Link>
  );
};

export default CardActionArea;
