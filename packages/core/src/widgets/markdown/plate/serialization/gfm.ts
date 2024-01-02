import { gfmFootnoteFromMarkdown, gfmFootnoteToMarkdown } from 'mdast-util-gfm-footnote';
import {
  gfmStrikethroughFromMarkdown,
  gfmStrikethroughToMarkdown,
} from 'mdast-util-gfm-strikethrough';
import { gfmTableFromMarkdown, gfmTableToMarkdown } from 'mdast-util-gfm-table';
import {
  gfmTaskListItemFromMarkdown,
  gfmTaskListItemToMarkdown,
} from 'mdast-util-gfm-task-list-item';
import { gfmFootnote } from 'micromark-extension-gfm-footnote';
import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmTable } from 'micromark-extension-gfm-table';
import { gfmTaskListItem } from 'micromark-extension-gfm-task-list-item';
import { combineExtensions } from 'micromark-util-combine-extensions';

import type { Root } from 'mdast';
import type { Plugin, Processor } from 'unified';

function gfmFromMarkdown() {
  return [
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown(),
    gfmTableFromMarkdown(),
    gfmTaskListItemFromMarkdown(),
  ];
}

function gfmToMarkdown() {
  return {
    extensions: [
      gfmFootnoteToMarkdown(),
      gfmStrikethroughToMarkdown(),
      gfmTableToMarkdown({}),
      gfmTaskListItemToMarkdown(),
    ],
  };
}

function gfm() {
  return combineExtensions([gfmFootnote(), gfmStrikethrough({}), gfmTable(), gfmTaskListItem()]);
}

declare module 'unified' {
  interface Data {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toMarkdownExtensions?: Array<any>;
  }
}

/**
 * Plugin to support GFM (footnotes, strikethrough, tables, tasklists).
 */
const remarkGfm: Plugin<void[], Root> = function (this: Processor) {
  const data = this.data();

  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  micromarkExtensions.push(gfm());
  fromMarkdownExtensions.push(gfmFromMarkdown());
  toMarkdownExtensions.push(gfmToMarkdown());
};

export default remarkGfm;
