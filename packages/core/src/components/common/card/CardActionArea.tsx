import React from 'react';
import { Link } from 'react-router-dom';

import { cardClasses } from './Card.util';

import type { ReactNode } from 'react';

interface CardActionAreaProps {
  to: string;
  children: ReactNode;
}

const CardActionArea = ({ to, children }: CardActionAreaProps) => {
  return (
    <Link to={to} className={cardClasses.actions}>
      {children}
    </Link>
  );
};

export default CardActionArea;
