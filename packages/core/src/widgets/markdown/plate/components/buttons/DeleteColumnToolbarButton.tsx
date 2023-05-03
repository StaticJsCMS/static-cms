import { TableDeleteColumn } from '@styled-icons/fluentui-system-regular/TableDeleteColumn';
import { deleteColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface DeleteColumnToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DeleteColumnToolbarButton: FC<DeleteColumnToolbarButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleDeleteColumn = useCallback(() => {
    deleteColumn(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip="Delete column"
      icon={TableDeleteColumn}
      onClick={handleDeleteColumn}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DeleteColumnToolbarButton;
