import React from 'react';

import Menu from '../../common/menu/Menu';
import MenuGroup from '../../common/menu/MenuGroup';
import MenuItemButton from '../../common/menu/MenuItemButton';

interface LocaleDropdownProps {
  locales: string[];
  defaultLocale: string;
  dropdownText: string;
  canChangeLocale: boolean;
  allowDefaultLocale: boolean;
  onLocaleChange?: (locale: string) => void;
}

const LocaleDropdown = ({
  locales,
  defaultLocale,
  dropdownText,
  canChangeLocale,
  allowDefaultLocale,
  onLocaleChange,
}: LocaleDropdownProps) => {
  if (!canChangeLocale) {
    return (
      <div
        className="
          btn
          border
          border-transparent
          text-slate-500
          dark:text-slate-400
        "
      >
        {dropdownText}
      </div>
    );
  }

  return (
    <Menu label={dropdownText}>
      <MenuGroup>
        {locales
          .filter(locale => allowDefaultLocale || locale !== defaultLocale)
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
