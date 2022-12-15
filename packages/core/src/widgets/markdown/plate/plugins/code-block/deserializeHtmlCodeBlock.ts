import { ELEMENT_CODE_BLOCK } from '@udecode/plate';

import type { DeserializeHtml } from '@udecode/plate-core';

const deserializeHtmlCodeBlock: DeserializeHtml = {
  rules: [
    {
      validNodeName: 'PRE',
    },
    {
      validNodeName: 'P',
      validStyle: {
        fontFamily: 'Consolas',
      },
    },
  ],
  getNode: el => {
    // const languageSelectorText =
    //   [...el.childNodes].find((node: ChildNode) => node.nodeName === 'SELECT')?.textContent || '';

    const textContent = el.textContent ?? ''; //?.replace(languageSelectorText, '') || '';

    return {
      type: ELEMENT_CODE_BLOCK,
      code: textContent,
      children: [{ text: '' }],
    };
  },
};

export default deserializeHtmlCodeBlock;
