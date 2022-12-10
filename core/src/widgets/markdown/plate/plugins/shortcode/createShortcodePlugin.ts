import { createPluginFactory } from '@udecode/plate';

import { ELEMENT_SHORTCODE } from '../../plateTypes';

const createShortcodePlugin = createPluginFactory({
  key: ELEMENT_SHORTCODE,
  isElement: true,
  isInline: true,
  type: ELEMENT_SHORTCODE,
});

export default createShortcodePlugin;
