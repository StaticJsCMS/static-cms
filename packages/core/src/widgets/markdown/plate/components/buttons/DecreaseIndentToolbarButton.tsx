import { FormatIndentDecrease as FormatIndentDecreaseIcon } from '@styled-icons/material/FormatIndentDecrease';
import { outdent } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface DecreaseIndentToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DecreaseIndentToolbarButton: FC<DecreaseIndentToolbarButtonProps> = ({
  disabled,
  variant,
}) => {
  const t = useTranslate();

  const editor = useMdPlateEditorState();

  const handleOutdent = useCallback(() => {
    outdent(editor);
  }, [editor]);

  return (
    <ToolbarButton
      id="decrease-ident"
      tooltip={t('editor.editorWidgets.markdown.decreaseIndent')}
      onClick={handleOutdent}
      icon={FormatIndentDecreaseIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DecreaseIndentToolbarButton;
