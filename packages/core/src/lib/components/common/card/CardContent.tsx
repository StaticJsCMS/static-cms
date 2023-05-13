import React from 'react';

import type { ReactNode } from 'react';

interface CardContentProps {
  children: ReactNode;
}

const CardContent = ({ children }: CardContentProps) => {
  return <p className="w-full p-5 font-normal text-gray-700 dark:text-gray-300">{children}</p>;
};

export default CardContent;
