import { Code as CodeIcon } from '@styled-icons/material/Code';
import { insertEmptyCodeBlock } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface CodeBlockToolbarButtonsProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const CodeBlockToolbarButtons: FC<CodeBlockToolbarButtonsProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleCodeBlockOnClick = useCallback(() => {
    insertEmptyCodeBlock(editor, {
      insertNodesOptions: { select: true },
    });
  }, [editor]);

  return (
    <ToolbarButton
      label="Code block"
      tooltip="Insert code block"
      icon={CodeIcon}
      onClick={handleCodeBlockOnClick}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default CodeBlockToolbarButtons;
