/* eslint-disable @typescript-eslint/ban-ts-comment */
import trimEnd from 'lodash/trimEnd';
import htmlToRehype from 'rehype-parse';
import rehypeToRemark from 'rehype-remark';
import rehypeToHtml from 'rehype-stringify';
import markdownToRemarkPlugin from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import remarkToMarkdownPlugin from 'remark-stringify';
import unified from 'unified';
import u from 'unist-builder';

import { getEditorComponents } from '../MarkdownControl';
import rehypePaperEmoji from './rehypePaperEmoji';
import remarkAllowHtmlEntities from './remarkAllowHtmlEntities';
import remarkAssertParents from './remarkAssertParents';
import remarkEscapeMarkdownEntities from './remarkEscapeMarkdownEntities';
import remarkPaddedLinks from './remarkPaddedLinks';
import remarkToRehypeShortcodes from './remarkRehypeShortcodes';
import { createRemarkShortcodeStringifier, remarkParseShortcodes } from './remarkShortcodes';
import remarkToSlate from './remarkSlate';
import remarkSquashReferences from './remarkSquashReferences';
import remarkStripTrailingBreaks from './remarkStripTrailingBreaks';
import remarkWrapHtml from './remarkWrapHtml';
import slateToRemark from './slateRemark';

import type { Pluggable, PluggableList } from 'unified';
import type { EditorComponentOptions, EditorComponentWidgetOptions, GetAssetFunction } from '../../../interface';
import { resolveWidget } from '../../../lib/registry';

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
export function markdownToRemark(markdown: string, remarkPlugins: PluggableList) {
  const processor = unified()
    .use(markdownToRemarkPlugin)
    .use(markdownToRemarkRemoveTokenizers, { inlineTokenizers: ['url'] })
    .use(remarkParseShortcodes, { plugins: getEditorComponents() })
    .use(remarkAllowHtmlEntities)
    .use(remarkSquashReferences)
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

/**
 * Serialize an MDAST to a Markdown string.
 */
export function remarkToMarkdown(obj, remarkPlugins: PluggableList) {
  /**
   * Rewrite the remark-stringify text visitor to simply return the text value,
   * without encoding or escaping any characters. This means we're completely
   * trusting the markdown that we receive.
   */
  function remarkAllowAllText() {
    // @ts-ignore
    const Compiler = this.Compiler;
    const visitors = Compiler.prototype.visitors;
    visitors.text = (node: any) => node.value;
  }

  /**
   * Provide an empty MDAST if no value is provided.
   */
  const mdast = obj || u('root', [u('paragraph', [u('text', '')])]);

  const remarkToMarkdownPluginOpts = {
    commonmark: true,
    fences: true,
    listItemIndent: '1',

    /**
     * Use asterisk for everything, it's the most versatile. Eventually using
     * other characters should be an option.
     */
    bullet: '*',
    emphasis: '*',
    strong: '*',
    rule: '-',
  };

  const processor = unified()
    .use({ settings: remarkToMarkdownPluginOpts })
    .use(remarkEscapeMarkdownEntities)
    .use(remarkStripTrailingBreaks)
    .use(remarkToMarkdownPlugin)
    .use(remarkAllowAllText)
    .use(createRemarkShortcodeStringifier({ plugins: getEditorComponents() }))
    .use(remarkPlugins);

  /**
   * Transform the MDAST with plugins.
   */
  const processedMdast = processor.runSync(mdast);

  /**
   * Serialize the MDAST to markdown.
   */
  const markdown = processor.stringify(processedMdast).replace(/\r?/g, '');

  /**
   * Return markdown with trailing whitespace removed.
   */
  return trimEnd(markdown);
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
    .use(remarkToRehypeShortcodes, { plugins: getEditorComponents(), getAsset })
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

/**
 * Deserialize an HTML string to Slate's Raw AST. Currently used for HTML
 * pastes.
 */
export function htmlToSlate(html) {
  const hast = unified().use(htmlToRehype, { fragment: true }).parse(html);

  const mdast = unified()
    .use(rehypePaperEmoji)
    .use(rehypeToRemark, { minify: false })
    .runSync(hast);

  const slateRaw = unified()
    .use(remarkAssertParents)
    .use(remarkPaddedLinks)
    .use(remarkWrapHtml)
    .use(remarkToSlate)
    .runSync(mdast);

  return slateRaw;
}

/**
 * Convert Markdown to Slate's Raw AST.
 */
export function markdownToSlate(markdown, { voidCodeBlock, remarkPlugins = [] } = {}) {
  const mdast = markdownToRemark(markdown, remarkPlugins);

  const slateRaw = unified()
    .use(remarkWrapHtml)
    .use(remarkToSlate, { voidCodeBlock })
    .runSync(mdast);

  return slateRaw;
}

/**
 * Convert a Slate Raw AST to Markdown.
 *
 * Requires shortcode plugins to parse shortcode nodes back to text.
 *
 * Note that Unified is not utilized for the conversion from Slate's Raw AST to
 * MDAST. The conversion is manual because Unified can only operate on Unist
 * trees.
 */
export function slateToMarkdown(
  raw: any,
  {
    voidCodeBlock,
    remarkPlugins = [],
  }: { voidCodeBlock?: EditorComponentWidgetOptions; remarkPlugins?: Pluggable[] } = {},
) {
  const mdast = slateToRemark(raw, { voidCodeBlock });
  const markdown = remarkToMarkdown(mdast, remarkPlugins);
  return markdown;
}
