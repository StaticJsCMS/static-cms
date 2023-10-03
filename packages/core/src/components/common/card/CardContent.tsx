import React from 'react';

import cardClasses from './Card.classes';

import type { FC, ReactNode } from 'react';

interface CardContentProps {
  children: ReactNode;
}

const CardContent: FC<CardContentProps> = ({ children }) => {
  return <p className={cardClasses.content}>{children}</p>;
};

export default CardContent;
