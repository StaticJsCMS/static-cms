import { TableInsertRow } from '@styled-icons/fluentui-system-regular/TableInsertRow';
import { insertTableRow } from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';

export interface InsertRowToolbarButtonProps {
  disabled: boolean;
}

const InsertRowToolbarButton: FC<InsertRowToolbarButtonProps> = ({ disabled }) => {
  const handleInsertTableRow = useCallback((editor: MdEditor) => {
    insertTableRow(editor);
  }, []);

  return (
    <ToolbarButton
      key="insertRow"
      tooltip="Insert Row"
      icon={<TableInsertRow className="w-5 h-5" />}
      onClick={handleInsertTableRow}
      disabled={disabled}
    />
  );
};

export default InsertRowToolbarButton;
