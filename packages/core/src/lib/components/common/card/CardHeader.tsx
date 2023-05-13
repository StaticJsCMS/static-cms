import React from 'react';

import type { ReactNode } from 'react';

interface CardHeaderProps {
  children: ReactNode;
}

const CardHeader = ({ children }: CardHeaderProps) => {
  return (
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {children}
    </h5>
  );
};

export default CardHeader;
