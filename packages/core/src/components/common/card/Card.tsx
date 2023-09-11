import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import cardClasses from './Card.classes';

import type { ReactNode } from 'react';

import './Card.css';

interface CardProps {
  children: ReactNode | ReactNode[];
  className?: string;
  title?: string;
}

const Card = ({ children, className, title }: CardProps) => {
  return (
    <div className={classNames(cardClasses.root, className)} title={title}>
      {children}
    </div>
  );
};

export default Card;
