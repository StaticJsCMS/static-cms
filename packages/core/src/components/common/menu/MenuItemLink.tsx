import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC, ReactNode } from 'react';

export interface MenuItemLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  startIcon?: FC<{ className?: string }>;
  endIcon?: FC<{ className?: string }>;
}

const MenuItemLink = ({
  href,
  children,
  className,
  active = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
}: MenuItemLinkProps) => {
  return (
    <MenuItemUnstyled
      component={NavLink}
      to={href}
      slotProps={{
        root: {
          className: classNames(
            className,
            active ? 'bg-slate-100 dark:bg-slate-900' : '',
            `
              px-4
              py-2
              text-sm
              text-gray-700
              dark:text-gray-300
              w-full
              text-left
              flex
              items-center
              justify-between
              hover:bg-slate-100
              dark:hover:bg-slate-900
            `,
          ),
        },
      }}
    >
      <div className="flex items-center gap-2 flex-grow">
        {StartIcon ? <StartIcon className="h-5 w-5" /> : null}
        {children}
      </div>
      {EndIcon ? <EndIcon className="h-5 w-5" /> : null}
    </MenuItemUnstyled>
  );
};

export default MenuItemLink;
