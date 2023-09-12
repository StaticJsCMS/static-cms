import { MenuItem } from '@mui/base/MenuItem';
import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC, MouseEvent, ReactNode } from 'react';

import './MenuItemButton.css';

export const classes = generateClassNames('MenuItemButton', [
  'root',
  'active',
  'default',
  'warning',
  'error',
  'content',
  'start-icon',
  'end-icon',
]);

export interface MenuItemButtonProps {
  active?: boolean;
  onClick: (event: MouseEvent) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  startIcon?: FC<{ className?: string }>;
  endIcon?: FC<{ className?: string }>;
  color?: 'default' | 'error' | 'warning';
  'data-testid'?: string;
}

const MenuItemButton = ({
  active = false,
  onClick,
  children,
  className,
  disabled = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  color = 'default',
  'data-testid': dataTestId,
}: MenuItemButtonProps) => {
  return (
    <MenuItem
      slotProps={{
        root: {
          className: classNames(
            className,
            classes.root,
            active && classes.active,
            color === 'default' && classes.default,
            color === 'warning' && classes.warning,
            color === 'error' && classes.error,
          ),
        },
      }}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      <div className={classes.content}>
        {StartIcon ? <StartIcon className={classes['start-icon']} /> : null}
        {children}
      </div>
      {EndIcon ? <EndIcon className={classes['end-icon']} /> : null}
    </MenuItem>
  );
};

export default MenuItemButton;
