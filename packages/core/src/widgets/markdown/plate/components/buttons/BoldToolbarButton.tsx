import { FormatBold as FormatBoldIcon } from '@styled-icons/material/FormatBold';
import { MARK_BOLD } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface BoldToolbarButtonProps {
  disabled: boolean;
}

const BoldToolbarButton: FC<BoldToolbarButtonProps> = ({ disabled }) => {
  return (
    <MarkToolbarButton
      tooltip="Bold"
      type={MARK_BOLD}
      icon={<FormatBoldIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default BoldToolbarButton;
