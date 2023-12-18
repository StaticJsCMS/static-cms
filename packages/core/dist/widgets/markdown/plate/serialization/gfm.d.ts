import type { Root } from 'mdast';
import type { Plugin } from 'unified';
/**
 * Plugin to support GFM (footnotes, strikethrough, tables, tasklists).
 */
declare const remarkGfm: Plugin<void[], Root>;
export default remarkGfm;
