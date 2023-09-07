import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';
import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC, ReactNode } from 'react';

import './MenuItemLink.css';

export const classes = generateClassNames('MenuItemLink', [
  'root',
  'active',
  'content',
  'start-icon',
  'end-icon',
]);

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
          className: classNames(className, classes.root, active && classes.active),
        },
      }}
    >
      <div className={classes.content}>
        {StartIcon ? <StartIcon className={classes['start-icon']} /> : null}
        {children}
      </div>
      {EndIcon ? <EndIcon className={classes['end-icon']} /> : null}
    </MenuItemUnstyled>
  );
};

export default MenuItemLink;
