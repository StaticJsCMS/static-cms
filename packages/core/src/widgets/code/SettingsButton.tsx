import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import React from 'react';

import type { FC, MouseEvent } from 'react';

export interface SettingsButtonProps {
  showClose?: boolean;
  onClick: (event: MouseEvent) => void;
}

const SettingsButton: FC<SettingsButtonProps> = ({ showClose = false, onClick }) => {
  return <IconButton onClick={onClick}>{showClose ? <CloseIcon /> : <SettingsIcon />}</IconButton>;
};

export default SettingsButton;
