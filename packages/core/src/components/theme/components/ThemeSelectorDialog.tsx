import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback } from 'react';

import { changeTheme } from '@staticcms/core/actions/globalUI';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import IconButton from '../../common/button/IconButton';
import Modal from '../../common/modal/Modal';
import useThemes from '../hooks/useThemes';
import ThemeCard from './ThemeCard';

import type { FC } from 'react';

import './ThemeSelectorDialog.css';

export const classes = generateClassNames('ThemeSelectorDialog', [
  'root',
  'header',
  'title',
  'close-icon',
  'grid',
]);

export interface ThemeSelectorDialogProps {
  open: boolean;
  onClose: () => void;
}

const ThemeSelectorDialog: FC<ThemeSelectorDialogProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const t = useTranslate();

  const theme = useAppSelector(selectTheme);
  const themes = useThemes();

  const handleThemeChange = useCallback(
    (newTheme: string) => {
      console.log('new theme', newTheme);
      dispatch(changeTheme(newTheme));
    },
    [dispatch],
  );

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <div className={classes.header}>
        <h2 className={classes.title}>{t('ui.settingsDropdown.theme')}</h2>
        <IconButton variant="text" onClick={onClose}>
          <CloseIcon className={classes['close-icon']} />
        </IconButton>
      </div>
      <div className={classes.grid}>
        {themes.map((themeOption, index) => (
          <ThemeCard
            key={index}
            theme={themeOption}
            currentTheme={theme}
            onClick={handleThemeChange}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ThemeSelectorDialog;
