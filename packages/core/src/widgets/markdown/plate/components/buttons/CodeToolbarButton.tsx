import { Code as CodeIcon } from '@styled-icons/material/Code';
import { MARK_CODE } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface CodeToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const CodeToolbarButton: FC<CodeToolbarButtonProps> = ({ disabled, variant }) => {
  return (
    <MarkToolbarButton
      tooltip="Code"
      type={MARK_CODE}
      icon={CodeIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default CodeToolbarButton;
