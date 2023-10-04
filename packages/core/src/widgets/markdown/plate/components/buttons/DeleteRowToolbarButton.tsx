import { TableDeleteRow } from '@styled-icons/fluentui-system-regular/TableDeleteRow';
import { deleteRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface DeleteRowToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DeleteRowToolbarButton: FC<DeleteRowToolbarButtonProps> = ({ disabled, variant }) => {
  const t = useTranslate();

  const editor = useMdPlateEditorState();

  const handleDeleteRow = useCallback(() => {
    deleteRow(editor);
  }, [editor]);

  return (
    <ToolbarButton
      id="delete-row"
      tooltip={t('editor.editorWidgets.markdown.table.deleteRow')}
      icon={TableDeleteRow}
      onClick={handleDeleteRow}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DeleteRowToolbarButton;
