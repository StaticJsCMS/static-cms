import {
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
  insertTableColumn,
  insertTableRow,
  onKeyDownTable,
} from '@udecode/plate';
import { createPluginFactory } from '@udecode/plate-core';

import withTable from './withTable';

import type { MdValue } from '@staticcms/markdown';
import type { PlateEditor, TablePlugin } from '@udecode/plate';

/**
 * Enables support for tables.
 */
const createTablePlugin = createPluginFactory<TablePlugin<MdValue>, MdValue, PlateEditor<MdValue>>({
  key: ELEMENT_TABLE,
  isElement: true,
  handlers: {
    onKeyDown: onKeyDownTable,
  },
  deserializeHtml: {
    rules: [{ validNodeName: 'TABLE' }],
  },
  options: {
    insertColumn: (e, { fromCell }) => {
      insertTableColumn(e, {
        fromCell,
        disableSelect: true,
      });
    },
    insertRow: (e, { fromRow }) => {
      insertTableRow(e, {
        fromRow,
        disableSelect: true,
      });
    },
  },
  withOverrides: withTable,
  plugins: [
    {
      key: ELEMENT_TR,
      isElement: true,
      deserializeHtml: {
        rules: [{ validNodeName: 'TR' }],
      },
    },
    {
      key: ELEMENT_TD,
      isElement: true,
      deserializeHtml: {
        attributeNames: ['rowspan', 'colspan'],
        rules: [{ validNodeName: 'TD' }],
      },
      props: ({ element }) => ({
        nodeProps: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          colSpan: (element?.attributes as any)?.colspan,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          rowSpan: (element?.attributes as any)?.rowspan,
        },
      }),
    },
    {
      key: ELEMENT_TH,
      isElement: true,
      deserializeHtml: {
        attributeNames: ['rowspan', 'colspan'],
        rules: [{ validNodeName: 'TH' }],
      },
      props: ({ element }) => ({
        nodeProps: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          colSpan: (element?.attributes as any)?.colspan,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          rowSpan: (element?.attributes as any)?.rowspan,
        },
      }),
    },
  ],
});

export default createTablePlugin;
