import React from 'react';

import { cardClasses } from './Card.util';

import type { ReactNode } from 'react';

interface CardHeaderProps {
  children: ReactNode;
}

const CardHeader = ({ children }: CardHeaderProps) => {
  return <h5 className={cardClasses.header}>{children}</h5>;
};

export default CardHeader;
