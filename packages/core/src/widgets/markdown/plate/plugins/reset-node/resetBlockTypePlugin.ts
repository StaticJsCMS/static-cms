import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_PARAGRAPH,
  ELEMENT_TODO_LI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@udecode/plate';

import type { ResetNodePlugin } from '@udecode/plate';
import type { MdPlatePlugin } from '@staticcms/markdown';

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

const resetBlockTypePlugin: Partial<MdPlatePlugin<ResetNodePlugin>> = {
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
    ],
  },
};

export default resetBlockTypePlugin;
