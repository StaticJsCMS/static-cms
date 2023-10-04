import { FormatItalic as FormatItalicIcon } from '@styled-icons/material/FormatItalic';
import { MARK_ITALIC } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface ItalicToolbarButtonsProp {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const ItalicToolbarButton: FC<TranslatedProps<ItalicToolbarButtonsProp>> = ({
  disabled,
  variant,
  t,
}) => {
  return (
    <MarkToolbarButton
      tooltip={t('editor.editorWidgets.markdown.italic')}
      type={MARK_ITALIC}
      variant={variant}
      icon={FormatItalicIcon}
      disabled={disabled}
    />
  );
};

export default ItalicToolbarButton;
