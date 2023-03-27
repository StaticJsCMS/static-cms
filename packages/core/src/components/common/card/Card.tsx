import React from 'react';

import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode | ReactNode[];
}

const Card = ({ children }: CardProps) => {
  return (
    <div
      className="
      bg-white border
      border-gray-200
      rounded-lg
      shadow-md
      dark:bg-slate-800
      dark:border-gray-700
    "
    >
      {children}
    </div>
  );
};

export default Card;
