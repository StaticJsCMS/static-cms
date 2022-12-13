import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React from 'react';

import { zIndex } from '@staticcms/core/components/UI/styles';

import type { FC, MouseEvent } from 'react';

const StyledSettingsButton = styled(IconButton)`
  position: absolute;
  z-index: ${zIndex.zIndex100};
  right: 8px;
  top: 8px;
  opacity: 0.8;
  padding: 2px 4px;
  line-height: 1;
  height: auto;
  color: #000;
`;

export interface SettingsButtonProps {
  showClose?: boolean;
  onClick: (event: MouseEvent) => void;
}

const SettingsButton: FC<SettingsButtonProps> = ({ showClose = false, onClick }) => {
  return (
    <StyledSettingsButton onClick={onClick}>
      {showClose ? <CloseIcon /> : <SettingsIcon />}
    </StyledSettingsButton>
  );
};

export default SettingsButton;
