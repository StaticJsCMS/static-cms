import { TableDeleteRow } from '@styled-icons/fluentui-system-regular/TableDeleteRow';
import { deleteRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface DeleteRowToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DeleteRowToolbarButton: FC<TranslatedProps<DeleteRowToolbarButtonProps>> = ({ disabled, variant, t }) => {
  const editor = useMdPlateEditorState();

  const handleDeleteRow = useCallback(() => {
    deleteRow(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip={t('editor.editorWidgets.markdown.table.deleteRow')}
      icon={TableDeleteRow}
      onClick={handleDeleteRow}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DeleteRowToolbarButton;
