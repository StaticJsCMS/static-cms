import React from 'react';
import styled from '@emotion/styled';

import Icon from './Icon';
import { buttons, colors, colorsRaw, shadows } from './styles';
import { transientOptions } from '../lib';

import type { MouseEventHandler } from 'react';

const sizes = {
  small: '28px',
  large: '40px',
};

interface ButtonRoundProps {
  $size: 'small' | 'large';
  $isActive: boolean;
}

const ButtonRound = styled(
  'button',
  transientOptions,
)<ButtonRoundProps>(
  ({ $isActive, $size }) => `
    ${buttons.button};
    ${shadows.dropMiddle};
    background-color: ${colorsRaw.white};
    color: ${colors[$isActive ? `active` : `inactive`]};
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${sizes[$size]};
    height: ${sizes[$size]};
    padding: 0;
  `,
);

interface IconButtonProps {
  size: 'small' | 'large';
  isActive: boolean;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: string;
  title: string;
}

function IconButton({ size, isActive, type, onClick, className, title }: IconButtonProps) {
  return (
    <ButtonRound
      $size={size}
      $isActive={isActive}
      className={className}
      onClick={onClick}
      title={title}
    >
      <Icon type={type} size={size} />
    </ButtonRound>
  );
}

export default IconButton;
