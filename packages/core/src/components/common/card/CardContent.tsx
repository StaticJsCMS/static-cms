import React from 'react';

import cardClasses from './Card.classes';

import type { FC, ReactNode } from 'react';

export interface CardContentProps {
  children: ReactNode;
}

const CardContent: FC<CardContentProps> = ({ children }) => {
  return <div className={cardClasses.content}>{children}</div>;
};

export default CardContent;
