import React from 'react';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC, MouseEvent, ReactNode } from 'react';

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
    <MenuItemUnstyled
      slotProps={{
        root: {
          className: classNames(
            className,
            active ? 'bg-slate-200 dark:bg-slate-600' : '',
            `
              px-4
              py-2
              text-sm
              w-full
              text-left
              disabled:text-gray-300
              flex
              items-center
              justify-between
              cursor-pointer
              dark:disabled:text-gray-700
            `,
            color === 'default' &&
              `
                text-gray-700
                dark:text-gray-300
                hover:bg-gray-200
                dark:hover:bg-slate-600
              `,
            color === 'warning' &&
              `
                text-yellow-600
                dark:text-yellow-500
                hover:text-white
                hover:bg-yellow-500
                dark:hover:text-yellow-100
                dark:hover:bg-yellow-600
              `,
            color === 'error' &&
              `
                text-red-500
                dark:text-red-500
                hover:text-white
                hover:bg-red-500
                dark:hover:text-red-100
                dark:hover:bg-red-600
              `,
          ),
        },
      }}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      <div className="flex items-center gap-2 flex-grow">
        {StartIcon ? <StartIcon className="h-5 w-5" /> : null}
        {children}
      </div>
      {EndIcon ? <EndIcon className="h-5 w-5" /> : null}
    </MenuItemUnstyled>
  );
};

export default MenuItemButton;
