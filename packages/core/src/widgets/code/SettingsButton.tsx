import { Close as CloseIcon } from '@styled-icons/material/Close';
import { Settings as SettingsIcon } from '@styled-icons/material/Settings';
import React from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC, MouseEvent } from 'react';

import './SettingsButton.css';

const classes = generateClassNames('WidgetCode_SettingsButton', ['root', 'icon']);

export interface SettingsButtonProps {
  showClose?: boolean;
  disabled: boolean;
  onClick: (event: MouseEvent) => void;
}

const SettingsButton: FC<SettingsButtonProps> = ({ showClose = false, disabled, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      color="secondary"
      variant="text"
      disabled={disabled}
      className={classes.root}
      aria-label="toggle settings"
    >
      {showClose ? (
        <CloseIcon className={classes.icon} />
      ) : (
        <SettingsIcon className={classes.icon} />
      )}
    </IconButton>
  );
};

export default SettingsButton;
