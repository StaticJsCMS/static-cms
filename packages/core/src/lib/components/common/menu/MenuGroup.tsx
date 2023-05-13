import React from 'react';

import type { ReactNode } from 'react';

export interface MenuGroupProps {
  children: ReactNode | ReactNode[];
}

const MenuGroup = ({ children }: MenuGroupProps) => {
  return (
    <div
      className="
        py-1
        border-b
        border-gray-200
        dark:border-slate-700
      "
    >
      {children}
    </div>
  );
};

export default MenuGroup;
