import { FormatStrikethrough as FormatStrikethroughIcon } from '@styled-icons/material/FormatStrikethrough';
import { MARK_STRIKETHROUGH } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface StrikethroughToolbarButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const StrikethroughToolbarButton: FC<StrikethroughToolbarButtonProps> = ({ disabled, variant }) => {
  return (
    <MarkToolbarButton
      tooltip="Strikethrough"
      type={MARK_STRIKETHROUGH}
      variant={variant}
      icon={FormatStrikethroughIcon}
      disabled={disabled}
    />
  );
};

export default StrikethroughToolbarButton;
