import { ELEMENT_CODE_BLOCK } from '@udecode/plate';
import { createPluginFactory } from '@udecode/plate-core';

import deserializeHtmlCodeBlock from './deserializeHtmlCodeBlock';

import type { MdValue } from '@staticcms/markdown';
import type { HotkeyPlugin, PlateEditor } from '@udecode/plate-core';

/**
 * Enables support for pre-formatted code blocks.
 */
const createCodeBlockPlugin = createPluginFactory<HotkeyPlugin, MdValue, PlateEditor<MdValue>>({
  key: ELEMENT_CODE_BLOCK,
  isElement: true,
  deserializeHtml: deserializeHtmlCodeBlock,
  options: {
    hotkey: ['mod+opt+8', 'mod+shift+8'],
  },
});

export default createCodeBlockPlugin;
