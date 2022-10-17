import React from 'react';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

import { buttons, shadows, zIndex } from '../../components/UI/styles';

import type { MouseEvent } from 'react';

const StyledSettingsButton = styled('button')`
  ${buttons.button};
  ${buttons.default};
  ${shadows.drop};
  display: block;
  position: absolute;
  z-index: ${zIndex.zIndex100};
  right: 8px;
  top: 8px;
  opacity: 0.8;
  padding: 2px 4px;
  line-height: 1;
  height: auto;
`;

interface SettingsButtonProps {
  showClose?: boolean;
  onClick: (event: MouseEvent) => void;
}

const SettingsButton = ({ showClose = false, onClick }: SettingsButtonProps) => {
  return (
    <StyledSettingsButton onClick={onClick}>
      {showClose ? <CloseIcon /> : <SettingsIcon />}
    </StyledSettingsButton>
  );
};

export default SettingsButton;
