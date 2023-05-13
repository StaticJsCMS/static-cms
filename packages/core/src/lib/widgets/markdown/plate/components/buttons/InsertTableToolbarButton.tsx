import { TableAdd } from '@styled-icons/fluentui-system-regular/TableAdd';
import { insertTable } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface InsertTableToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertTableToolbarButton: FC<InsertTableToolbarButtonProps> = ({
  disabled,
  variant = 'button',
}) => {
  const editor = useMdPlateEditorState();

  const handleTableAdd = useCallback(() => {
    insertTable(editor, {
      rowCount: 2,
      colCount: 2,
    });
  }, [editor]);

  return (
    <ToolbarButton
      label="Table"
      tooltip="Insert table"
      icon={TableAdd}
      onClick={handleTableAdd}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertTableToolbarButton;
