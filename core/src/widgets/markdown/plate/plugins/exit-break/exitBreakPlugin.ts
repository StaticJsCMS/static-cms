import { KEYS_HEADING } from '@udecode/plate';

import type { ExitBreakPlugin } from '@udecode/plate';
import type { MdPlatePlugin } from '@staticcms/markdown';

const exitBreakPlugin: Partial<MdPlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
      },
    ],
  },
};

export default exitBreakPlugin;
