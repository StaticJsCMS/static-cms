import { Code as CodeIcon } from '@styled-icons/material/Code';
import { insertEmptyCodeBlock } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface CodeBlockToolbarButtonsProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const CodeBlockToolbarButtons: FC<CodeBlockToolbarButtonsProps> = ({
  disabled,
  variant,
}) => {
  const t = useTranslate();

  const editor = useMdPlateEditorState();

  const handleCodeBlockOnClick = useCallback(() => {
    insertEmptyCodeBlock(editor, {
      insertNodesOptions: { select: true },
    });
  }, [editor]);

  return (
    <ToolbarButton
      label={t('editor.editorWidgets.markdown.codeBlock')}
      tooltip={t('editor.editorWidgets.markdown.insertCodeBlock')}
      icon={CodeIcon}
      onClick={handleCodeBlockOnClick}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default CodeBlockToolbarButtons;
