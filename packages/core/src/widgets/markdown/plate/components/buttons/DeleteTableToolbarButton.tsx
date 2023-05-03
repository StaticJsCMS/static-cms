import { TableDismiss } from '@styled-icons/fluentui-system-regular/TableDismiss';
import { deleteTable } from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';

export interface DeleteTableToolbarButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const DeleteTableToolbarButton: FC<DeleteTableToolbarButtonProps> = ({ disabled }) => {
  const handleDeleteTable = useCallback((editor: MdEditor) => {
    deleteTable(editor);
  }, []);

  return (
    <ToolbarButton
      key="deleteTable"
      tooltip="Delete Table"
      icon={<TableDismiss className="w-5 h-5" />}
      onClick={handleDeleteTable}
      disabled={disabled}
    />
  );
};

export default DeleteTableToolbarButton;
