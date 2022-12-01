import { TableAdd } from '@styled-icons/fluentui-system-regular/TableAdd';
import { TableDeleteColumn } from '@styled-icons/fluentui-system-regular/TableDeleteColumn';
import { TableDeleteRow } from '@styled-icons/fluentui-system-regular/TableDeleteRow';
import { TableDismiss } from '@styled-icons/fluentui-system-regular/TableDismiss';
import { TableInsertColumn } from '@styled-icons/fluentui-system-regular/TableInsertColumn';
import { TableInsertRow } from '@styled-icons/fluentui-system-regular/TableInsertRow';
import {
  deleteColumn,
  deleteRow,
  deleteTable,
  insertTable,
  insertTableColumn,
  insertTableRow,
} from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';
import type { MdEditor } from '@staticcms/markdown';

export interface TableToolbarButtonsProps {
  isInTable?: boolean;
}

const TableToolbarButtons: FC<TableToolbarButtonsProps> = ({ isInTable = true }) => {
  const handleTableAdd = useCallback((editor: MdEditor) => {
    insertTable(editor, {
      rowCount: 2,
      colCount: 2,
    });
  }, []);

  const handleInsertTableRow = useCallback((editor: MdEditor) => {
    insertTableRow(editor);
  }, []);

  const handleDeleteRow = useCallback((editor: MdEditor) => {
    deleteRow(editor);
  }, []);

  const handleInsertTableColumn = useCallback((editor: MdEditor) => {
    insertTableColumn(editor);
  }, []);

  const handleDeleteColumn = useCallback((editor: MdEditor) => {
    deleteColumn(editor);
  }, []);

  const handleDeleteTable = useCallback((editor: MdEditor) => {
    deleteTable(editor);
  }, []);

  return isInTable ? (
    <>
      <ToolbarButton
        key="insertRow"
        tooltip="Insert Row"
        icon={<TableInsertRow />}
        onClick={handleInsertTableRow}
      />
      <ToolbarButton
        key="deleteRow"
        tooltip="Delete Row"
        icon={<TableDeleteRow />}
        onClick={handleDeleteRow}
      />
      <ToolbarButton
        key="insertColumn"
        tooltip="Insert Column"
        icon={<TableInsertColumn />}
        onClick={handleInsertTableColumn}
      />
      <ToolbarButton
        key="deleteColumn"
        tooltip="Delete Column"
        icon={<TableDeleteColumn />}
        onClick={handleDeleteColumn}
      />
      <ToolbarButton
        key="deleteTable"
        tooltip="Delete Table"
        icon={<TableDismiss />}
        onClick={handleDeleteTable}
      />
    </>
  ) : (
    <ToolbarButton
      key="insertRow"
      tooltip="Add Table"
      icon={<TableAdd />}
      onClick={handleTableAdd}
    />
  );
};

export default TableToolbarButtons;
