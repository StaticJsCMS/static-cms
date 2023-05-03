import { FormatBold as FormatBoldIcon } from '@styled-icons/material/FormatBold';
import { MARK_BOLD } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface BoldToolbarButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const BoldToolbarButton: FC<BoldToolbarButtonProps> = ({ disabled, variant }) => {
  return (
    <MarkToolbarButton
      tooltip="Bold"
      type={MARK_BOLD}
      variant={variant}
      icon={FormatBoldIcon}
      disabled={disabled}
    />
  );
};

export default BoldToolbarButton;
