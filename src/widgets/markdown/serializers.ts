import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

// import { getEditorComponents } from '../../../lib/registry';

import type { Pluggable } from 'unified';
import type { GetAssetFunction } from '../../interface';

interface MarkdownToHtmlProps {
  getAsset: GetAssetFunction;
  remarkPlugins?: Pluggable[];
}

/**
 * Convert Markdown to HTML.
 */
export function markdownToHtml(
  markdown: string,
  { remarkPlugins = [] }: MarkdownToHtmlProps,
): string {
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    // .use(remarkParseShortcodes as any, { plugins: getEditorComponents() })
    .use(remarkPlugins)
    // .use(remarkToRehypeShortcodes as any, { plugins: getEditorComponents(), getAsset })
    .use(remarkRehype, { allowDangerousHTML: true })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
      allowDangerousCharacters: true,
      closeSelfClosing: true,
      entities: { useNamedReferences: true },
    })
    .processSync(markdown);

  return String(html);
}
