import { TableInsertColumn } from '@styled-icons/fluentui-system-regular/TableInsertColumn';
import { insertTableColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface InsertColumnToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const InsertColumnToolbarButton: FC<TranslatedProps<InsertColumnToolbarButtonProps>> = ({ disabled, variant, t }) => {
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
