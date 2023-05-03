import { FormatItalic as FormatItalicIcon } from '@styled-icons/material/FormatItalic';
import { MARK_ITALIC } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface ItalicToolbarButtonsProp {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const ItalicToolbarButton: FC<ItalicToolbarButtonsProp> = ({ disabled, variant }) => {
  return (
    <MarkToolbarButton
      tooltip="Italic"
      type={MARK_ITALIC}
      variant={variant}
      icon={FormatItalicIcon}
      disabled={disabled}
    />
  );
};

export default ItalicToolbarButton;
