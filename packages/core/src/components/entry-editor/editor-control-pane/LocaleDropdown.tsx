import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Menu from '../../common/menu/Menu';
import MenuGroup from '../../common/menu/MenuGroup';
import MenuItemButton from '../../common/menu/MenuItemButton';

import type { FC } from 'react';

import './LocaleDropdown.css';

export const classes = generateClassNames('LocaleDropdown', ['root', 'no-edit']);

interface LocaleDropdownProps {
  locales: string[];
  defaultLocale: string;
  dropdownText: string;
  canChangeLocale: boolean;
  onLocaleChange?: (locale: string) => void;
  excludeLocales?: string[];
}

const LocaleDropdown: FC<LocaleDropdownProps> = ({
  locales,
  defaultLocale,
  dropdownText,
  canChangeLocale,
  onLocaleChange,
  excludeLocales = [defaultLocale],
}) => {
  if (!canChangeLocale) {
    return (
      <div className={classNames(classes.root, 'CMS_Button_root', classes['no-edit'])}>
        {dropdownText}
      </div>
    );
  }

  return (
    <Menu label={dropdownText} rootClassName={classes.root} aria-label="locale options dropdown">
      <MenuGroup>
        {locales
          .filter(locale => !excludeLocales.includes(locale))
          .map(locale => (
            <MenuItemButton key={locale} onClick={() => onLocaleChange?.(locale)}>
              {locale}
            </MenuItemButton>
          ))}
      </MenuGroup>
    </Menu>
  );
};

export default LocaleDropdown;
