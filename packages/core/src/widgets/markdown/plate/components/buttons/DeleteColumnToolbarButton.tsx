import { TableDeleteColumn } from '@styled-icons/fluentui-system-regular/TableDeleteColumn';
import { deleteColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface DeleteColumnToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DeleteColumnToolbarButton: FC<TranslatedProps<DeleteColumnToolbarButtonProps>> = ({
  disabled,
  variant,
  t,
}) => {
  const editor = useMdPlateEditorState();

  const handleDeleteColumn = useCallback(() => {
    deleteColumn(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip={t('editor.editorWidgets.markdown.table.deleteColumn')}
      icon={TableDeleteColumn}
      onClick={handleDeleteColumn}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DeleteColumnToolbarButton;
