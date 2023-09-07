import ClickAwayListener from '@mui/base/ClickAwayListener';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { useCallback, useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import useButtonClassNames from '../button/useButtonClassNames';

import type { FC, ReactNode } from 'react';
import type { BaseBaseProps } from '../button/Button';

import './Menu.css';

export const classes = generateClassNames('Menu', [
  'root',
  'hide-dropdown-icon',
  'hide-label',
  'hide-dropdown-icon-mobile',
  'dropdown',
  'dropdown-start-icon',
  'dropdown-icon',
  'label',
  'menu',
]);

export interface MenuProps {
  label: ReactNode;
  startIcon?: FC<{ className?: string }>;
  variant?: BaseBaseProps['variant'];
  color?: BaseBaseProps['color'];
  size?: BaseBaseProps['size'];
  rounded?: boolean | 'no-padding';
  rootClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
  labelClassName?: string;
  children: ReactNode | ReactNode[];
  hideDropdownIcon?: boolean;
  hideDropdownIconOnMobile?: boolean;
  hideLabel?: boolean;
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
  rootClassName,
  iconClassName,
  buttonClassName,
  labelClassName,
  children,
  hideDropdownIcon = false,
  hideDropdownIconOnMobile = false,
  hideLabel = false,
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

  const calculatedButtonClassName = useButtonClassNames(variant, color, size, rounded);

  const menuButtonClassNames = useMemo(
    () => classNames(calculatedButtonClassName, buttonClassName, classes.dropdown),
    [calculatedButtonClassName, buttonClassName],
  );

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
      <div
        className={classNames(
          classes.root,
          hideLabel && classes['hide-label'],
          hideDropdownIcon && classes['hide-dropdown-icon'],
          hideDropdownIconOnMobile && classes['hide-dropdown-icon-mobile'],
          rootClassName,
        )}
      >
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
          {StartIcon ? (
            <StartIcon className={classNames(classes['dropdown-start-icon'], iconClassName)} />
          ) : null}
          {!hideLabel ? (
            <div className={classNames(classes.label, labelClassName)}>{label}</div>
          ) : null}
          {!hideDropdownIcon ? (
            <KeyboardArrowDownIcon className={classes['dropdown-icon']} aria-hidden="true" />
          ) : null}
        </button>
        <MenuUnstyled
          open={isOpen}
          anchorEl={anchorEl}
          keepMounted={keepMounted}
          slotProps={{
            root: {
              className: classes.menu,
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
