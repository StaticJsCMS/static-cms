import { TableInsertColumn } from '@styled-icons/fluentui-system-regular/TableInsertColumn';
import { insertTableColumn } from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';

export interface InsertColumnToolbarButtonProps {
  disabled: boolean;
}

const InsertColumnToolbarButton: FC<InsertColumnToolbarButtonProps> = ({ disabled }) => {
  const handleInsertTableColumn = useCallback((editor: MdEditor) => {
    insertTableColumn(editor);
  }, []);

  return (
    <ToolbarButton
      key="insertColumn"
      tooltip="Insert Column"
      icon={<TableInsertColumn className="w-5 h-5" />}
      onClick={handleInsertTableColumn}
      disabled={disabled}
    />
  );
};

export default InsertColumnToolbarButton;
