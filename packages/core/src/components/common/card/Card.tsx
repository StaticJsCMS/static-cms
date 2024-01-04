import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import cardClasses from './Card.classes';

import type { FC, ReactNode } from 'react';

import './Card.css';

export interface CardProps {
  children: ReactNode | ReactNode[];
  className?: string;
  title?: string;
}

const Card: FC<CardProps> = ({ children, className, title }) => {
  return (
    <div className={classNames(cardClasses.root, className)} title={title}>
      {children}
    </div>
  );
};

export default Card;
