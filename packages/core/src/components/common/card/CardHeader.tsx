import React from 'react';

import cardClasses from './Card.classes';

import type { FC, ReactNode } from 'react';

interface CardHeaderProps {
  children: ReactNode;
}

const CardHeader: FC<CardHeaderProps> = ({ children }) => {
  return <h5 className={cardClasses.header}>{children}</h5>;
};

export default CardHeader;
