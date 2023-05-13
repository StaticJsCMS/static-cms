import { TableDismiss } from '@styled-icons/fluentui-system-regular/TableDismiss';
import { deleteTable } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface DeleteTableToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DeleteTableToolbarButton: FC<DeleteTableToolbarButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleDeleteTable = useCallback(() => {
    deleteTable(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip="Delete table"
      icon={TableDismiss}
      onClick={handleDeleteTable}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DeleteTableToolbarButton;
