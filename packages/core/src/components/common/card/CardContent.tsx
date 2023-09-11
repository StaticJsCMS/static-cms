import React from 'react';

import cardClasses from './Card.classes';

import type { ReactNode } from 'react';

interface CardContentProps {
  children: ReactNode;
}

const CardContent = ({ children }: CardContentProps) => {
  return <p className={cardClasses.content}>{children}</p>;
};

export default CardContent;
