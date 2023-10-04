import { FormatBold as FormatBoldIcon } from '@styled-icons/material/FormatBold';
import { MARK_BOLD } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface BoldToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const BoldToolbarButton: FC<TranslatedProps<BoldToolbarButtonProps>> = ({
  disabled,
  variant,
  t,
}) => {
  return (
    <MarkToolbarButton
      tooltip={t('editor.editorWidgets.markdown.bold')}
      type={MARK_BOLD}
      variant={variant}
      icon={FormatBoldIcon}
      disabled={disabled}
    />
  );
};

export default BoldToolbarButton;
