import autoformatRules from './autoformatRules';

import type { AutoformatPlugin } from '@udecode/plate';
import type { MdEditor, MdPlatePlugin, MdValue } from '@staticcms/markdown';

const autoformatPlugin: Partial<MdPlatePlugin<AutoformatPlugin<MdValue, MdEditor>>> = {
  options: {
    rules: autoformatRules,
    enableUndoOnDelete: true,
  },
};

export default autoformatPlugin;
