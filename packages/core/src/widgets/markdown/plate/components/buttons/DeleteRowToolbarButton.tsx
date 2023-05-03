import { TableDeleteRow } from '@styled-icons/fluentui-system-regular/TableDeleteRow';
import { deleteRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface DeleteRowToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DeleteRowToolbarButton: FC<DeleteRowToolbarButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleDeleteRow = useCallback(() => {
    deleteRow(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip="Delete row"
      icon={TableDeleteRow}
      onClick={handleDeleteRow}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DeleteRowToolbarButton;
