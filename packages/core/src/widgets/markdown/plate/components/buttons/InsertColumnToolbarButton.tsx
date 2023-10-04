import { TableInsertColumn } from '@styled-icons/fluentui-system-regular/TableInsertColumn';
import { insertTableColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface InsertColumnToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertColumnToolbarButton: FC<InsertColumnToolbarButtonProps> = ({ disabled, variant }) => {
  const t = useTranslate();

  const editor = useMdPlateEditorState();

  const handleInsertTableColumn = useCallback(() => {
    insertTableColumn(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip={t('editor.editorWidgets.markdown.table.insertColumn')}
      icon={TableInsertColumn}
      onClick={handleInsertTableColumn}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertColumnToolbarButton;
