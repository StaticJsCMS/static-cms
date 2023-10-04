import { FormatQuote as FormatQuoteIcon } from '@styled-icons/material/FormatQuote';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate';
import React from 'react';

import BlockToolbarButton from './common/BlockToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface BlockquoteToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const BlockquoteToolbarButton: FC<BlockquoteToolbarButtonProps> = ({ disabled, variant }) => {
  const t = useTranslate();

  return (
    <BlockToolbarButton
      label={t('editor.editorWidgets.markdown.quote')}
      tooltip={t('editor.editorWidgets.markdown.insertQuote')}
      icon={FormatQuoteIcon}
      type={ELEMENT_BLOCKQUOTE}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default BlockquoteToolbarButton;
