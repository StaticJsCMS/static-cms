import ClickAwayListener from '@mui/base/ClickAwayListener';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { useCallback, useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import useButtonClassNames from '../button/useButtonClassNames';

import type { FC, ReactNode } from 'react';
import type { BaseBaseProps } from '../button/Button';

export interface MenuProps {
  label: ReactNode;
  startIcon?: FC<{ className?: string }>;
  variant?: BaseBaseProps['variant'];
  color?: BaseBaseProps['color'];
  size?: BaseBaseProps['size'];
  rounded?: boolean | 'no-padding';
  className?: string;
  children: ReactNode | ReactNode[];
  hideDropdownIcon?: boolean;
  keepMounted?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
}

const Menu = ({
  label,
  startIcon: StartIcon,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  rounded = false,
  className,
  children,
  hideDropdownIcon = false,
  keepMounted = false,
  disabled = false,
  'data-testid': dataTestId,
}: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isOpen) {
        setAnchorEl(null);
      } else {
        setAnchorEl(event.currentTarget);
      }
    },
    [isOpen],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const buttonClassName = useButtonClassNames(variant, color, size, rounded);

  const menuButtonClassNames = useMemo(
    () => classNames(className, buttonClassName),
    [buttonClassName, className],
  );

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
      <div className="flex">
        <button
          type="button"
          onClick={handleButtonClick}
          aria-controls={isOpen ? 'simple-menu' : undefined}
          aria-expanded={isOpen || undefined}
          aria-haspopup="menu"
          data-testid={dataTestId}
          className={menuButtonClassNames}
          disabled={disabled}
        >
          {StartIcon ? <StartIcon className="-ml-0.5 mr-1.5 h-5 w-5" /> : null}
          {label}
          {!hideDropdownIcon ? (
            <KeyboardArrowDownIcon className="-mr-0.5 ml-2 h-5 w-5" aria-hidden="true" />
          ) : null}
        </button>
        <MenuUnstyled
          open={isOpen}
          anchorEl={anchorEl}
          keepMounted={keepMounted}
          slotProps={{
            root: {
              className: `
                absolute
                right-0
                z-40
                w-56
                origin-top-right
                rounded-md
                bg-white
                dark:bg-slate-800
                shadow-lg
                border
                border-gray-200
                focus:outline-none
                divide-y
                divide-gray-100
                dark:border-gray-700
                dark:divide-gray-600
              `,
              onClick: handleClose,
            },
          }}
        >
          {children}
        </MenuUnstyled>
      </div>
    </ClickAwayListener>
  );
};

export default Menu;
