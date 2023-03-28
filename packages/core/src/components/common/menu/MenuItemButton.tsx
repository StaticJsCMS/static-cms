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
              text-gray-700
              disabled:text-gray-300
              w-full
              text-left
              flex
              items-center
              justify-between
              cursor-pointer
              hover:bg-blue-500
              dark:text-gray-300
              dark:disabled:text-gray-700
              dark:hover:bg-blue-500
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
