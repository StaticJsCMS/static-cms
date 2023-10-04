import { Code as CodeIcon } from '@styled-icons/material/Code';
import { MARK_CODE } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface CodeToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const CodeToolbarButton: FC<TranslatedProps<CodeToolbarButtonProps>> = ({ disabled, variant, t }) => {
  return (
    <MarkToolbarButton
      tooltip={t('editor.editorWidgets.markdown.code')}
      type={MARK_CODE}
      icon={CodeIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default CodeToolbarButton;
