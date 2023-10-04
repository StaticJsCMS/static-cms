import { Code as CodeIcon } from '@styled-icons/material/Code';
import { MARK_CODE } from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface CodeToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const CodeToolbarButton: FC<CodeToolbarButtonProps> = ({
  disabled,
  variant,
}) => {
  const t = useTranslate();

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
