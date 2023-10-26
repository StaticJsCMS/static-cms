import Tooltip from '@mui/material/Tooltip';
import { Error as ErrorIcon } from '@styled-icons/material/Error';
import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import {
  getEntryDataPath,
  selectAllFieldErrors,
} from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Menu from '../../common/menu/Menu';
import MenuGroup from '../../common/menu/MenuGroup';
import MenuItemButton from '../../common/menu/MenuItemButton';

import type { FC, ReactNode } from 'react';

import './LocaleDropdown.css';

export const classes = generateClassNames('LocaleDropdown', [
  'root',
  'dropdown',
  'errors-icon',
  'no-edit',
]);

interface LocaleDropdownProps {
  locale: string;
  locales: string[];
  defaultLocale: string;
  dropdownText: string;
  canChangeLocale: boolean;
  onLocaleChange?: (locale: string) => void;
  excludeLocales?: string[];
}

const LocaleDropdown: FC<LocaleDropdownProps> = ({
  locale,
  locales,
  defaultLocale,
  dropdownText,
  canChangeLocale,
  onLocaleChange,
  excludeLocales = [defaultLocale],
}: LocaleDropdownProps) => {
  const allFieldErrors = useAppSelector(selectAllFieldErrors);
  const otherLocaleErrors = useMemo(() => {
    return locales
      .reduce((acc, l) => {
        if (l === locale || excludeLocales.includes(l)) {
          return acc;
        }

        const dataPath = getEntryDataPath(
          {
            currentLocale: l,
            defaultLocale,
            locales,
          },
          false,
        ).join('.');
        acc.push(
          ...Object.keys(allFieldErrors).reduce((errors, key) => {
            if (key.startsWith(dataPath)) {
              errors.push(
                ...allFieldErrors[key].filter(e => e.message).map(e => `${l}: ${e.message!}`),
              );
            }

            return errors;
          }, [] as string[]),
        );
        return acc;
      }, [] as ReactNode[])
      .map((e, index) => {
        if (index === 0) {
          return e;
        }

        return (
          <>
            <br />
            {e}
          </>
        );
      });
  }, [allFieldErrors, defaultLocale, excludeLocales, locale, locales]);

  if (!canChangeLocale) {
    return (
      <div className={classNames(classes.root, 'CMS_Button_root', classes['no-edit'])}>
        {dropdownText}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Menu
        label={dropdownText}
        rootClassName={classes.dropdown}
        aria-label="locale options dropdown"
      >
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
      {otherLocaleErrors.length > 0 ? (
        <Tooltip title={otherLocaleErrors}>
          <ErrorIcon className={classes['errors-icon']} />
        </Tooltip>
      ) : null}
    </div>
  );
};

export default LocaleDropdown;
