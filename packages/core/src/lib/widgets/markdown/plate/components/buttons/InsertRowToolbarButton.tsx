import { TableInsertRow } from '@styled-icons/fluentui-system-regular/TableInsertRow';
import { insertTableRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface InsertRowToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertRowToolbarButton: FC<InsertRowToolbarButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleInsertTableRow = useCallback(() => {
    insertTableRow(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip="Insert row"
      icon={TableInsertRow}
      onClick={handleInsertTableRow}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertRowToolbarButton;
