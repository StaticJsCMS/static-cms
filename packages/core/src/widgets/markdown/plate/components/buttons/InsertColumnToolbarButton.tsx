import { TableInsertColumn } from '@styled-icons/fluentui-system-regular/TableInsertColumn';
import { insertTableColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface InsertColumnToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertColumnToolbarButton: FC<InsertColumnToolbarButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleInsertTableColumn = useCallback(() => {
    insertTableColumn(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip="Insert column"
      icon={TableInsertColumn}
      onClick={handleInsertTableColumn}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertColumnToolbarButton;
