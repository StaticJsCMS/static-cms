import { TableInsertRow } from '@styled-icons/fluentui-system-regular/TableInsertRow';
import { insertTableRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface InsertRowToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertRowToolbarButton: FC<InsertRowToolbarButtonProps> = ({ disabled, variant }) => {
  const t = useTranslate();

  const editor = useMdPlateEditorState();

  const handleInsertTableRow = useCallback(() => {
    insertTableRow(editor);
  }, [editor]);

  return (
    <ToolbarButton
      id="insert-row"
      tooltip={t('editor.editorWidgets.markdown.table.insertRow')}
      icon={TableInsertRow}
      onClick={handleInsertTableRow}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertRowToolbarButton;
