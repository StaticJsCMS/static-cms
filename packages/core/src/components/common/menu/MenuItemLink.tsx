import { Menu } from '@headlessui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC, ReactNode } from 'react';

export interface MenuItemLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  startIcon?: FC<{ className?: string }>;
  endIcon?: FC<{ className?: string }>;
}

const MenuItemLink = ({
  href,
  children,
  className,
  startIcon: StartIcon,
  endIcon: EndIcon,
}: MenuItemLinkProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <NavLink
          className={classNames(
            className,
            active ? 'bg-slate-100 dark:bg-slate-900' : '',
            'px-4 py-2 text-sm text-gray-700 dark:text-gray-300 w-full text-left flex items-center justify-between',
          )}
          to={href}
        >
          <div className="flex items-center gap-2 flex-grow">
            {StartIcon ? <StartIcon className="h-5 w-5" /> : null}
            {children}
          </div>
          {EndIcon ? <EndIcon className="h-5 w-5" /> : null}
        </NavLink>
      )}
    </Menu.Item>
  );
};

export default MenuItemLink;
