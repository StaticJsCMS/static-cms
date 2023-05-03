import { TableDeleteColumn } from '@styled-icons/fluentui-system-regular/TableDeleteColumn';
import { deleteColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface DeleteColumnToolbarButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const DeleteColumnToolbarButton: FC<DeleteColumnToolbarButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleDeleteColumn = useCallback(() => {
    deleteColumn(editor);
  }, [editor]);

  if (variant === 'menu') {
    return (
      <MenuItemButton key="insertRow" onClick={handleDeleteColumn} startIcon={TableDeleteColumn}>
        Delete Column
      </MenuItemButton>
    );
  }

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
