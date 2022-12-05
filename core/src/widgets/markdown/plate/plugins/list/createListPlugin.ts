import { createPluginFactory, KEY_DESERIALIZE_HTML, someNode } from '@udecode/plate-core';
import { onKeyDownList } from '@udecode/plate-list';

import withList from './withList';

import type { PlateEditor, PlatePlugin } from '@udecode/plate-core';
import type { ListPlugin } from '@udecode/plate-list';
import type { MdValue } from '@staticcms/markdown';

export const ELEMENT_UL = 'ul';
export const ELEMENT_OL = 'ol';
export const ELEMENT_LI = 'li';
export const ELEMENT_LIC = 'lic';

export type MdListPlugin = PlatePlugin<ListPlugin, MdValue, PlateEditor<MdValue>>;

/**
 * Enables support for bulleted, numbered and to-do lists.
 */
const createListPlugin = createPluginFactory<ListPlugin, MdValue, PlateEditor<MdValue>>({
  key: 'list',
  plugins: [
    {
      key: ELEMENT_UL,
      isElement: true,
      handlers: {
        onKeyDown: onKeyDownList,
      },
      withOverrides: withList,
      deserializeHtml: {
        rules: [
          {
            validNodeName: 'UL',
          },
        ],
      },
    } as MdListPlugin,
    {
      key: ELEMENT_OL,
      isElement: true,
      handlers: {
        onKeyDown: onKeyDownList,
      },
      deserializeHtml: { rules: [{ validNodeName: 'OL' }] },
    } as MdListPlugin,
    {
      key: ELEMENT_LI,
      isElement: true,
      deserializeHtml: { rules: [{ validNodeName: 'LI' }] },
      then: (editor, { type }) => ({
        inject: {
          pluginsByKey: {
            [KEY_DESERIALIZE_HTML]: {
              editor: {
                insertData: {
                  preInsert: () => {
                    return someNode(editor, { match: { type } });
                  },
                },
              },
            },
          },
        },
      }),
    },
    {
      key: ELEMENT_LIC,
      isElement: true,
    },
  ],
});

export default createListPlugin;
