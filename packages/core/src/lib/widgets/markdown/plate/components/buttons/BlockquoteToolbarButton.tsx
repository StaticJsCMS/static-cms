import { FormatQuote as FormatQuoteIcon } from '@styled-icons/material/FormatQuote';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate';
import React from 'react';

import BlockToolbarButton from './common/BlockToolbarButton';

import type { FC } from 'react';

export interface BlockquoteToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const BlockquoteToolbarButton: FC<BlockquoteToolbarButtonProps> = ({ disabled, variant }) => {
  return (
    <BlockToolbarButton
      label="Blockquote"
      tooltip="Insert blockquote"
      icon={FormatQuoteIcon}
      type={ELEMENT_BLOCKQUOTE}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default BlockquoteToolbarButton;
