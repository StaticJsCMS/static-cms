import { Dropdown } from '@mui/base/Dropdown';
import { Menu as BaseMenu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { useMemo } from 'react';

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
  disabled?: boolean;
  keepMounted?: boolean;
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
  disabled = false,
  keepMounted = false,
  'data-testid': dataTestId,
}: MenuProps) => {
  const calculatedButtonClassName = useButtonClassNames(variant, color, size, rounded);

  const menuButtonClassNames = useMemo(
    () => classNames(calculatedButtonClassName, buttonClassName, classes.dropdown),
    [calculatedButtonClassName, buttonClassName],
  );

  return (
    <Dropdown>
      <div
        className={classNames(
          classes.root,
          hideLabel && classes['hide-label'],
          hideDropdownIcon && classes['hide-dropdown-icon'],
          hideDropdownIconOnMobile && classes['hide-dropdown-icon-mobile'],
          rootClassName,
        )}
      >
        <MenuButton
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
        </MenuButton>
        <BaseMenu
          slotProps={{
            root: {
              className: classes.menu,
              keepMounted,
            },
          }}
        >
          {children}
        </BaseMenu>
      </div>
    </Dropdown>
  );
};

export default Menu;
