import { TableDeleteRow } from '@styled-icons/fluentui-system-regular/TableDeleteRow';
import { deleteRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';

export interface DeleteRowToolbarButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const DeleteRowToolbarButton: FC<DeleteRowToolbarButtonProps> = ({ disabled }) => {
  const handleDeleteRow = useCallback((editor: MdEditor) => {
    deleteRow(editor);
  }, []);

  return (
    <ToolbarButton
      key="deleteRow"
      tooltip="Delete Row"
      icon={<TableDeleteRow className="w-5 h-5" />}
      onClick={handleDeleteRow}
      disabled={disabled}
    />
  );
};

export default DeleteRowToolbarButton;
