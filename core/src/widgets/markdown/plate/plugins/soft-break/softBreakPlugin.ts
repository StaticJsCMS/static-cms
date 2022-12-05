import { ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, ELEMENT_TD } from '@udecode/plate';

import type { SoftBreakPlugin } from '@udecode/plate';
import type { MdPlatePlugin } from '@staticcms/markdown';

const softBreakPlugin: Partial<MdPlatePlugin<SoftBreakPlugin>> = {
  options: {
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
        },
      },
    ],
  },
};

export default softBreakPlugin;
