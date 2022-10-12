/* eslint-disable @typescript-eslint/ban-ts-comment */
import rehypeToHtml from 'rehype-stringify';
import markdownToRemarkPlugin from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import unified from 'unified';

import remarkAllowHtmlEntities from './remarkAllowHtmlEntities';
import remarkToRehypeShortcodes from './remarkRehypeShortcodes';
import { remarkParseShortcodes } from './remarkShortcodes';
import remarkSquashReferences from './remarkSquashReferences';
import { getEditorComponents } from '../../../lib/registry';

import type { Pluggable } from 'unified';
import type { GetAssetFunction } from '../../../interface';

/**
 * This module contains all serializers for the Markdown widget.
 *
 * The value of a Markdown widget is transformed to various formats during
 * editing, and these formats are referenced throughout serializer source
 * documentation. Below is brief glossary of the formats used.
 *
 * - Markdown {string}
 *   The stringified Markdown value. The value of the field is persisted
 *   (stored) in this format, and the stringified value is also used when the
 *   editor is in "raw" Markdown mode.
 *
 * - MDAST {object}
 *   Also loosely referred to as "Remark". MDAST stands for MarkDown AST
 *   (Abstract Syntax Tree), and is an object representation of a Markdown
 *   document. Underneath, it's a Unist tree with a Markdown-specific schema.
 *   MDAST syntax is a part of the Unified ecosystem, and powers the Remark
 *   processor, so Remark plugins may be used.
 *
 * - HAST {object}
 *   Also loosely referred to as "Rehype". HAST, similar to MDAST, is an object
 *   representation of an HTML document.  The field value takes this format
 *   temporarily before the document is stringified to HTML.
 *
 * - HTML {string}
 *   The field value is stringifed to HTML for preview purposes - the HTML value
 *   is never parsed, it is output only.
 *
 * - Slate Raw AST {object}
 *   Slate's Raw AST is a very simple and unopinionated object representation of
 *   a document in a Slate editor. We define our own Markdown-specific schema
 *   for serialization to/from Slate's Raw AST and MDAST.
 */

/**
 * Deserialize a Markdown string to an MDAST.
 */
export function markdownToRemark(markdown: string, remarkPlugins: Pluggable[]) {
  const processor = unified()
    .use(markdownToRemarkPlugin)
    .use(markdownToRemarkRemoveTokenizers, { inlineTokenizers: ['url'] })
    .use(remarkParseShortcodes as any, { plugins: getEditorComponents() })
    .use(remarkAllowHtmlEntities)
    .use(remarkSquashReferences as any)
    .use(remarkPlugins);

  /**
   * Parse the Markdown string input to an MDAST.
   */
  const parsed = processor.parse(markdown);

  /**
   * Further transform the MDAST with plugins.
   */
  const result = processor.runSync(parsed);

  return result;
}

/**
 * Remove named tokenizers from the parser, effectively deactivating them.
 */
function markdownToRemarkRemoveTokenizers({ inlineTokenizers }: any) {
  inlineTokenizers &&
    inlineTokenizers.forEach((tokenizer: any) => {
      // @ts-ignore
      delete this.Parser.prototype.inlineTokenizers[tokenizer];
    });
}

interface MarkdownToHtmlProps {
  getAsset: GetAssetFunction;
  remarkPlugins?: Pluggable[];
}

/**
 * Convert Markdown to HTML.
 */
export function markdownToHtml(
  markdown: string,
  { getAsset, remarkPlugins = [] }: MarkdownToHtmlProps,
) {
  const mdast = markdownToRemark(markdown, remarkPlugins);

  const hast = unified()
    .use(remarkToRehypeShortcodes as any, { plugins: getEditorComponents(), getAsset })
    .use(remarkToRehype, { allowDangerousHTML: true })
    .runSync(mdast);

  const html = unified()
    .use(rehypeToHtml, {
      allowDangerousHtml: true,
      allowDangerousCharacters: true,
      closeSelfClosing: true,
      entities: { useNamedReferences: true },
    })
    .stringify(hast);

  return html;
}
