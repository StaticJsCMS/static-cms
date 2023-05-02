import { TableAdd } from '@styled-icons/fluentui-system-regular/TableAdd';
import { insertTable } from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface AddTableToolbarButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const AddTableToolbarButton: FC<AddTableToolbarButtonProps> = ({
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

  if (variant === 'menu') {
    return (
      <MenuItemButton key="insertRow" onClick={handleTableAdd} startIcon={TableAdd}>
        File / Link
      </MenuItemButton>
    );
  }

  return (
    <ToolbarButton
      key="insertRow"
      tooltip="Add Table"
      icon={<TableAdd className="w-5 h-5" />}
      onClick={handleTableAdd}
      disabled={disabled}
    />
  );
};

export default AddTableToolbarButton;
