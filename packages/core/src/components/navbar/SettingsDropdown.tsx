import { Logout as LogoutIcon } from '@styled-icons/material/Logout';
import { Palette as PaletteIcon } from '@styled-icons/material/Palette';
import { Person as PersonIcon } from '@styled-icons/material/Person';
import React, { useCallback, useState } from 'react';
import { translate } from 'react-polyglot';

import { logoutUser } from '@staticcms/core/actions/auth';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectUser } from '@staticcms/core/reducers/selectors/auth';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';
import ThemeSelectorDialog from '../theme/components/ThemeSelectorDialog';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

import './SettingsDropdown.css';

export const classes = generateClassNames('SettingsDropdown', [
  'root',
  'in-editor',
  'avatar-image',
  'avatar-icon',
  'sr-label',
]);

interface AvatarImageProps {
  imageUrl: string | undefined;
}

const AvatarImage = ({ imageUrl }: AvatarImageProps) => {
  return imageUrl ? (
    <img className={classes['avatar-image']} src={imageUrl} />
  ) : (
    <PersonIcon className={classes['avatar-icon']} />
  );
};

export interface SettingsDropdownProps {
  inEditor: boolean;
}

const SettingsDropdown: FC<TranslatedProps<SettingsDropdownProps>> = ({ inEditor, t }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [themeDialogOpen, setThemeDialogOpen] = useState(false);

  const handleOpenThemeDialog = useCallback(() => {
    setThemeDialogOpen(true);
  }, []);

  const handleCloseThemeDialog = useCallback(() => {
    setThemeDialogOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <>
      <Menu
        label={
          <>
            <span className={classes['sr-label']}>Open user menu</span>
            <AvatarImage imageUrl={user?.avatar_url} />
          </>
        }
        color="secondary"
        variant="outlined"
        rounded={!user?.avatar_url || 'no-padding'}
        hideDropdownIcon
        rootClassName={classNames(classes.root, inEditor && classes['in-editor'])}
        aria-label="account options dropdown"
      >
        <MenuGroup>
          <MenuItemButton key="dark-mode" onClick={handleOpenThemeDialog} startIcon={PaletteIcon}>
            {t('ui.settingsDropdown.theme')}
          </MenuItemButton>
        </MenuGroup>
        <MenuGroup>
          <MenuItemButton key="log-out" onClick={handleLogout} startIcon={LogoutIcon}>
            {t('ui.settingsDropdown.logOut')}
          </MenuItemButton>
        </MenuGroup>
      </Menu>
      <ThemeSelectorDialog open={themeDialogOpen} onClose={handleCloseThemeDialog} />
    </>
  );
};

export default translate()(SettingsDropdown) as FC<SettingsDropdownProps>;
