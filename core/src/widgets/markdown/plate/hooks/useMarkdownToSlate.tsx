import { ELEMENT_PARAGRAPH } from '@udecode/plate';
import { useEffect, useState } from 'react';
import gfm from 'remark-gfm';
import mdx from 'remark-mdx';
import markdown from 'remark-parse';
import { unified } from 'unified';

import toSlatePlugin from '../serialization/slate/toSlatePlugin';

import type { MdValue } from '../plateTypes';

const useMarkdownToSlate = (markdownValue: string): [MdValue, boolean] => {
  const [loaded, setLoaded] = useState(false);
  const [slateValue, setSlateValue] = useState<MdValue>([]);

  useEffect(() => {
    unified()
      .use(markdown)
      .use(gfm)
      .use(mdx)
      .use(toSlatePlugin)
      .process(markdownValue, (err, file) => {
        if (err) {
          console.error(err);
          return;
        }
        setSlateValue(file?.result as MdValue);
        setLoaded(true);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    slateValue.length > 0 ? slateValue : [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }],
    loaded,
  ];
};

export default useMarkdownToSlate;
