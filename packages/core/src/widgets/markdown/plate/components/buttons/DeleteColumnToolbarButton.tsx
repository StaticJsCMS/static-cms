import { TableDeleteColumn } from '@styled-icons/fluentui-system-regular/TableDeleteColumn';
import { deleteColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';

export interface DeleteColumnToolbarButtonProps {
  disabled: boolean;
}

const DeleteColumnToolbarButton: FC<DeleteColumnToolbarButtonProps> = ({ disabled }) => {
  const handleDeleteColumn = useCallback((editor: MdEditor) => {
    deleteColumn(editor);
  }, []);

  return (
    <ToolbarButton
      key="deleteColumn"
      tooltip="Delete Column"
      icon={<TableDeleteColumn className="w-5 h-5" />}
      onClick={handleDeleteColumn}
      disabled={disabled}
    />
  );
};

export default DeleteColumnToolbarButton;
