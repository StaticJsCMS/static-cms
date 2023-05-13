import { Close as CloseIcon } from '@styled-icons/material/Close';
import { Settings as SettingsIcon } from '@styled-icons/material/Settings';
import React from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';

import type { FC, MouseEvent } from 'react';

export interface SettingsButtonProps {
  showClose?: boolean;
  disabled: boolean;
  onClick: (event: MouseEvent) => void;
}

const SettingsButton: FC<SettingsButtonProps> = ({ showClose = false, disabled, onClick }) => {
  return (
    <IconButton onClick={onClick} size="small" variant="text" disabled={disabled}>
      {showClose ? <CloseIcon className="w-5 h-5" /> : <SettingsIcon className="w-5 h-5" />}
    </IconButton>
  );
};

export default SettingsButton;
