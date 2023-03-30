import { Moon as MoonIcon } from '@styled-icons/bootstrap/Moon';
import { Logout as LogoutIcon } from '@styled-icons/material/Logout';
import { Person as PersonIcon } from '@styled-icons/material/Person';
import React, { useCallback, useState } from 'react';
import { translate } from 'react-polyglot';

import { logoutUser } from '@staticcms/core/actions/auth';
import { changeTheme } from '@staticcms/core/actions/globalUI';
import { selectUser } from '@staticcms/core/reducers/selectors/auth';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';
import Switch from '../common/switch/Switch';

import type { ChangeEvent, MouseEvent } from 'react';
import type { TranslateProps } from 'react-polyglot';

interface AvatarImageProps {
  imageUrl: string | undefined;
}

const AvatarImage = ({ imageUrl }: AvatarImageProps) => {
  return imageUrl ? (
    <img className="w-9 h-9 rounded-full" src={imageUrl} />
  ) : (
    <PersonIcon className="w-6 h-6" />
  );
};

const SettingsDropdown = ({ t }: TranslateProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const handleToggleDarkMode = useCallback(
    (event: MouseEvent | ChangeEvent) => {
      event.stopPropagation();

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
          setIsDarkMode(true);
          dispatch(changeTheme('dark'));
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
          setIsDarkMode(false);
          dispatch(changeTheme('light'));
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
          setIsDarkMode(false);
          dispatch(changeTheme('light'));
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
          setIsDarkMode(true);
          dispatch(changeTheme('dark'));
        }
      }
    },
    [dispatch],
  );

  return (
    <Menu
      label={
        <>
          <span className="sr-only">Open user menu</span>
          <AvatarImage imageUrl={user?.avatar_url} />
        </>
      }
      variant="outlined"
      rounded={!user?.avatar_url || 'no-padding'}
      hideDropdownIcon
    >
      <MenuGroup>
        <MenuItemButton key="dark-mode" onClick={handleToggleDarkMode} startIcon={MoonIcon}>
          <div className="flex justify-between w-full">
            {t('ui.settingsDropdown.darkMode')}
            <Switch value={isDarkMode} onChange={handleToggleDarkMode} />
          </div>
        </MenuItemButton>
      </MenuGroup>
      <MenuGroup>
        <MenuItemButton key="log-out" onClick={handleLogout} startIcon={LogoutIcon}>
          {t('ui.settingsDropdown.logOut')}
        </MenuItemButton>
      </MenuGroup>
    </Menu>
  );
};

export default translate()(SettingsDropdown);
