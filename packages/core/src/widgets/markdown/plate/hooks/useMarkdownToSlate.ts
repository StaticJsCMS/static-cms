import { ELEMENT_PARAGRAPH } from '@udecode/plate';
import { useEffect, useState } from 'react';
import mdx from 'remark-mdx';
import markdown from 'remark-parse';
import { unified } from 'unified';

import { getShortcodes } from '../../../../lib/registry';
import gfm from '../serialization/gfm';
import toSlatePlugin from '../serialization/slate/toSlatePlugin';

import type { ShortcodeConfig } from '../../../../interface';
import type { MdValue } from '../plateTypes';

export interface UseMarkdownToSlateOptions {
  shortcodeConfigs?: Record<string, ShortcodeConfig>;
  useMdx: boolean;
}

export const markdownToSlate = async (
  markdownValue: string,
  { useMdx, shortcodeConfigs }: UseMarkdownToSlateOptions,
) => {
  return new Promise<MdValue>(resolve => {
    unified()
      .use(markdown)
      .use(gfm)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .use(useMdx ? mdx : () => {})
      .use(toSlatePlugin({ shortcodeConfigs: shortcodeConfigs ?? getShortcodes(), useMdx }))
      .process(markdownValue, (err, file) => {
        if (err) {
          console.error(err);
          return;
        }
        resolve(file?.result as MdValue);
      });
  });
};

const useMarkdownToSlate = (
  markdownValue: string,
  options: UseMarkdownToSlateOptions,
): [MdValue, boolean] => {
  const [loaded, setLoaded] = useState(false);
  const [slateValue, setSlateValue] = useState<MdValue>([]);

  useEffect(() => {
    markdownToSlate(markdownValue, options).then(value => {
      setSlateValue(value);
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
