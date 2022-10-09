import styled from '@emotion/styled';
import React from 'react';

import { transientOptions } from '../../../lib';
import { buttons, Icon } from '../../../ui';

import type { MouseEvent } from 'react';
import type { IconType } from '../../../ui/Icon/icons';

interface StyledToolbarButtonProps {
  $isActive: boolean;
}

const StyledToolbarButton = styled(
  'button',
  transientOptions,
)<StyledToolbarButtonProps>(
  ({ $isActive }) => `
    ${buttons.button};
    display: inline-block;
    padding: 6px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    color: ${$isActive ? '#1e2532' : 'inherit'};
    cursor: pointer;

    &:disabled {
      cursor: auto;
      opacity: 0.5;
    }

    ${Icon} {
      display: block;
    }
  `,
);

interface ToolbarButtonProps {
  type: string;
  label: string;
  icon: IconType;
  onClick?: (event: MouseEvent, type: string) => void;
  isActive: boolean;
  disabled: boolean;
}

const ToolbarButton = ({ type, label, icon, onClick, isActive, disabled }: ToolbarButtonProps) => {
  return (
    <StyledToolbarButton
      $isActive={isActive}
      onClick={e => onClick && onClick(e, type)}
      title={label}
      disabled={disabled}
    >
      {icon ? <Icon type={icon} /> : label}
    </StyledToolbarButton>
  );
};

export default ToolbarButton;
