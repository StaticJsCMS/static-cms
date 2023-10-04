import { TableInsertRow } from '@styled-icons/fluentui-system-regular/TableInsertRow';
import { insertTableRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface InsertRowToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertRowToolbarButton: FC<TranslatedProps<InsertRowToolbarButtonProps>> = ({ disabled, variant, t }) => {
  const editor = useMdPlateEditorState();

  const handleInsertTableRow = useCallback(() => {
    insertTableRow(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip={t('editor.editorWidgets.markdown.table.insertRow')}
      icon={TableInsertRow}
      onClick={handleInsertTableRow}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertRowToolbarButton;
