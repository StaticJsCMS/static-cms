import { TableDismiss } from '@styled-icons/fluentui-system-regular/TableDismiss';
import { deleteTable } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface DeleteTableToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DeleteTableToolbarButton: FC<TranslatedProps<DeleteTableToolbarButtonProps>> = ({ disabled, variant, t }) => {
  const editor = useMdPlateEditorState();

  const handleDeleteTable = useCallback(() => {
    deleteTable(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip={t('editor.editorWidgets.markdown.table.deleteTable')}
      icon={TableDismiss}
      onClick={handleDeleteTable}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DeleteTableToolbarButton;
