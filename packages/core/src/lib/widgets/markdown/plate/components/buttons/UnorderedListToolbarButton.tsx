import { FormatListBulleted as FormatListBulletedIcon } from '@styled-icons/material/FormatListBulleted';
import { ELEMENT_UL } from '@udecode/plate';
import React from 'react';

import ListToolbarButton from './common/ListToolbarButton';

import type { FC } from 'react';

export interface UnorderedListToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const UnorderedListToolbarButton: FC<UnorderedListToolbarButtonProps> = ({ disabled, variant }) => {
  return (
    <ListToolbarButton
      tooltip="List"
      type={ELEMENT_UL}
      icon={FormatListBulletedIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default UnorderedListToolbarButton;
