import { FormatStrikethrough as FormatStrikethroughIcon } from '@styled-icons/material/FormatStrikethrough';
import { MARK_STRIKETHROUGH } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface StrikethroughToolbarButtonProps {
  disabled: boolean;
}

const StrikethroughToolbarButton: FC<StrikethroughToolbarButtonProps> = ({ disabled }) => {
  return (
    <MarkToolbarButton
      tooltip="Strikethrough"
      type={MARK_STRIKETHROUGH}
      icon={<FormatStrikethroughIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default StrikethroughToolbarButton;
