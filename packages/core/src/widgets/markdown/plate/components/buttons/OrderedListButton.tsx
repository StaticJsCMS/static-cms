import { FormatListNumbered as FormatListNumberedIcon } from '@styled-icons/material/FormatListNumbered';
import { ELEMENT_OL } from '@udecode/plate';
import React from 'react';

import ListToolbarButton from './common/ListToolbarButton';

import type { FC } from 'react';

export interface OrderedListButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const OrderedListButton: FC<OrderedListButtonProps> = ({ disabled }) => {
  return (
    <ListToolbarButton
      tooltip="Numbered List"
      type={ELEMENT_OL}
      icon={<FormatListNumberedIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default OrderedListButton;
