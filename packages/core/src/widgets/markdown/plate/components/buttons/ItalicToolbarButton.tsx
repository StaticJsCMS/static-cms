import { FormatItalic as FormatItalicIcon } from '@styled-icons/material/FormatItalic';
import { MARK_ITALIC } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface ItalicToolbarButtonsProp {
  disabled: boolean;
}

const ItalicToolbarButton: FC<ItalicToolbarButtonsProp> = ({ disabled }) => {
  return (
    <MarkToolbarButton
      tooltip="Italic"
      type={MARK_ITALIC}
      icon={<FormatItalicIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default ItalicToolbarButton;
