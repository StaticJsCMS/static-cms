import { FormatListBulleted as FormatListBulletedIcon } from '@styled-icons/material/FormatListBulleted';
import { ELEMENT_UL } from '@udecode/plate';
import React from 'react';

import ListToolbarButton from './common/ListToolbarButton';

import type { FC } from 'react';

export interface UnorderedListButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const UnorderedListButton: FC<UnorderedListButtonProps> = ({ disabled }) => {
  return (
    <ListToolbarButton
      tooltip="List"
      type={ELEMENT_UL}
      icon={<FormatListBulletedIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default UnorderedListButton;
