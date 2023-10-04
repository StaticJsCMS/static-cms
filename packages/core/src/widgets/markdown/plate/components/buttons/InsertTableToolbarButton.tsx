import { TableAdd } from '@styled-icons/fluentui-system-regular/TableAdd';
import { insertTable } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface InsertTableToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertTableToolbarButton: FC<TranslatedProps<InsertTableToolbarButtonProps>> = ({
  disabled,
  variant = 'button',
  t,
}) => {
  const editor = useMdPlateEditorState();

  const handleTableAdd = useCallback(() => {
    insertTable(editor, {
      rowCount: 2,
      colCount: 2,
    });
  }, [editor]);

  return (
    <ToolbarButton
      label={t('editor.editorWidgets.markdown.table.table')}
      tooltip={t('editor.editorWidgets.markdown.table.insertTable')}
      icon={TableAdd}
      onClick={handleTableAdd}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertTableToolbarButton;
