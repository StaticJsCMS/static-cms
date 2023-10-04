import { FormatStrikethrough as FormatStrikethroughIcon } from '@styled-icons/material/FormatStrikethrough';
import { MARK_STRIKETHROUGH } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface StrikethroughToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const StrikethroughToolbarButton: FC<TranslatedProps<StrikethroughToolbarButtonProps>> = ({ disabled, variant, t }) => {
  return (
    <MarkToolbarButton
      tooltip={t('editor.editorWidgets.markdown.strikethrough')}
      type={MARK_STRIKETHROUGH}
      variant={variant}
      icon={FormatStrikethroughIcon}
      disabled={disabled}
    />
  );
};

export default StrikethroughToolbarButton;
