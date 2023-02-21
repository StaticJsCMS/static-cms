import { Menu } from '@headlessui/react';
import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FC, MouseEvent, ReactNode } from 'react';

export interface MenuItemButtonProps {
  onClick: (event: MouseEvent) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  startIcon?: FC<{ className?: string }>;
  endIcon?: FC<{ className?: string }>;
  'data-testid'?: string;
}

const MenuItemButton = ({
  onClick,
  children,
  className,
  disabled = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  'data-testid': dataTestId,
}: MenuItemButtonProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            className,
            active ? 'bg-slate-100 dark:bg-slate-900' : '',
            'px-4 py-2 text-sm text-gray-700 disabled:text-gray-300 dark:text-gray-300 dark:disabled:text-gray-700 w-full text-left flex items-center justify-between',
          )}
          onClick={onClick}
          disabled={disabled}
          data-testid={dataTestId}
        >
          <div className="flex items-center gap-2 flex-grow">
            {StartIcon ? <StartIcon className="h-5 w-5" /> : null}
            {children}
          </div>
          {EndIcon ? <EndIcon className="h-5 w-5" /> : null}
        </button>
      )}
    </Menu.Item>
  );
};

export default MenuItemButton;
