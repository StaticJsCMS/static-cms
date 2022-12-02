/* eslint-disable no-case-declarations */
// import { BlockType, defaultNodeTypes, LeafType, NodeTypes } from './ast-types';
import escapeHtml from 'escape-html';

import { LIST_TYPES, NodeTypes } from './slate/ast-types';

import type {
  MdCodeBlockElement,
  MdImageElement,
  MdLinkElement,
  MdListItemElement,
  MdParagraphElement,
} from '../plateTypes';
import type { TableNode, BlockType, LeafType } from './slate/ast-types';
import type { CSSProperties } from 'react';

type FontStyles = Pick<CSSProperties, 'color' | 'backgroundColor' | 'textAlign'>;

interface MdLeafType extends LeafType {
  superscript?: boolean;
  subscript?: boolean;
  underline?: boolean;
  color?: string;
  backgroundColor?: string;
}

interface MdBlockType extends Omit<BlockType, 'children'> {
  children: Array<MdBlockType | MdLeafType>;
}

interface Options {
  isInTable?: boolean;
  isInCode?: boolean;
  listDepth?: number;
  blockquoteDepth?: number;
  ignoreParagraphNewline?: boolean;
}

const isLeafNode = (node: MdBlockType | MdLeafType): node is MdLeafType => {
  return typeof (node as MdLeafType).text === 'string';
};

const VOID_ELEMENTS: Array<keyof typeof NodeTypes> = ['thematic_break', 'image', 'code_block'];

const BREAK_TAG = '<br />';

const CODE_ELEMENTS = [NodeTypes.code_block];

export default function serializerMarkdown(chunk: MdBlockType | MdLeafType, opts: Options = {}) {
  const {
    ignoreParagraphNewline = false,
    listDepth = 0,
    isInTable = false,
    isInCode = false,
    blockquoteDepth = 0,
  } = opts;

  const text = (chunk as MdLeafType).text || '';
  let type = (chunk as MdBlockType).type || '';

  let children = text;

  if (!isLeafNode(chunk)) {
    let separator = '';
    if (type === NodeTypes.tableRow) {
      separator = '|';
    }

    children = chunk.children
      .map((c: MdBlockType | MdLeafType) => {
        const selfIsTable = type === NodeTypes.table;
        const isList = !isLeafNode(c) ? (LIST_TYPES as string[]).includes(c.type || '') : false;
        const selfIsList = (LIST_TYPES as string[]).includes(chunk.type || '');
        const selfIsCode = (CODE_ELEMENTS as string[]).includes(chunk.type || '');
        const selfIsBlockquote = chunk.type === 'blockquote';

        // Links can have the following shape
        // In which case we don't want to surround
        // with break tags
        // {
        //  type: 'paragraph',
        //  children: [
        //    { text: '' },
        //    { type: 'link', children: [{ text: foo.com }]}
        //    { text: '' }
        //  ]
        // }
        let childrenHasLink = false;

        if (!isLeafNode(chunk) && Array.isArray(chunk.children)) {
          childrenHasLink = chunk.children.some(f => !isLeafNode(f) && f.type === NodeTypes.link);
        }

        return serializerMarkdown(
          { ...c, parentType: type },
          {
            // WOAH.
            // what we're doing here is pretty tricky, it relates to the block below where
            // we check for ignoreParagraphNewline and set type to paragraph.
            // We want to strip out empty paragraphs sometimes, but other times we don't.
            // If we're the descendant of a list, we know we don't want a bunch
            // of whitespace. If we're parallel to a link we also don't want
            // to respect neighboring paragraphs
            ignoreParagraphNewline:
              (ignoreParagraphNewline || isList || selfIsList || childrenHasLink) &&
              // if we have c.break, never ignore empty paragraph new line
              !(c as MdBlockType).break,

            // track depth of nested lists so we can add proper spacing
            listDepth: (LIST_TYPES as string[]).includes((c as MdBlockType).type || '')
              ? listDepth + 1
              : listDepth,

            isInTable: selfIsTable || isInTable,

            isInCode: selfIsCode || isInCode,

            blockquoteDepth: selfIsBlockquote ? blockquoteDepth + 1 : blockquoteDepth,
          },
        );
      })
      .join(separator);
  }

  // This is pretty fragile code, check the long comment where we iterate over children
  if (
    !ignoreParagraphNewline &&
    (text === '' || text === '\n') &&
    chunk.parentType === NodeTypes.paragraph &&
    type !== NodeTypes.image
  ) {
    type = NodeTypes.paragraph;
    children = '\n';
  }

  if (children === '' && !VOID_ELEMENTS.find(k => NodeTypes[k] === type)) {
    return;
  }

  // Never allow decorating break tags with rich text formatting,
  // this can malform generated markdown
  // Also ensure we're only ever applying text formatting to leaf node
  // level chunks, otherwise we can end up in a situation where
  // we try applying formatting like to a node like this:
  // "Text foo bar **baz**" resulting in "**Text foo bar **baz****"
  // which is invalid markup and can mess everything up
  if (children !== '\n' && isLeafNode(chunk)) {
    children = isInCode || chunk.code ? children : escapeHtml(children);
    if (chunk.strikethrough && chunk.bold && chunk.italic) {
      children = retainWhitespaceAndFormat(children, '~~***');
    } else if (chunk.bold && chunk.italic) {
      children = retainWhitespaceAndFormat(children, '***');
    } else {
      if (chunk.bold) {
        children = retainWhitespaceAndFormat(children, '**');
      }

      if (chunk.italic) {
        children = retainWhitespaceAndFormat(children, '_');
      }

      if (chunk.strikethrough) {
        children = retainWhitespaceAndFormat(children, '~~');
      }

      if (chunk.code) {
        children = retainWhitespaceAndFormat(children, '`');
      }

      if (chunk.subscript) {
        children = retainWhitespaceAndFormat(children, '<sub>', '</sub>');
      }

      if (chunk.superscript) {
        children = retainWhitespaceAndFormat(children, '<sup>', '</sup>');
      }

      if (chunk.underline) {
        children = retainWhitespaceAndFormat(children, '<u>', '</u>');
      }

      if (chunk.color || chunk.backgroundColor) {
        const style: FontStyles = {};
        if (chunk.color) {
          style.color = chunk.color;
        }
        if (chunk.backgroundColor) {
          style.backgroundColor = chunk.backgroundColor;
        }

        const styleString = (Object.keys(style) as (keyof FontStyles)[])
          .map(key => `${key}: '${style[key]}'`)
          .join(', ');

        children = retainWhitespaceAndFormat(
          children,
          `<font style={{ ${styleString} }}>`,
          '</font>',
        );
      }
    }
  }

  if (!type) {
    return children;
  }

  switch (type) {
    case NodeTypes.heading[1]:
      return `# ${children}\n`;
    case NodeTypes.heading[2]:
      return `## ${children}\n`;
    case NodeTypes.heading[3]:
      return `### ${children}\n`;
    case NodeTypes.heading[4]:
      return `#### ${children}\n`;
    case NodeTypes.heading[5]:
      return `##### ${children}\n`;
    case NodeTypes.heading[6]:
      return `###### ${children}\n`;

    case NodeTypes.block_quote:
      // For some reason, marked is parsing blockquotes w/ one new line
      // as contiued blockquotes, so adding two new lines ensures that doesn't
      // happen
      return `> ${children
        .replace(/^[\n]*|[\n]*$/gm, '')
        .split('\n')
        .join('\n> ')}\n\n`;

    case NodeTypes.code_block:
      const codeBlock = chunk as MdCodeBlockElement;
      return `\`\`\`${codeBlock.lang ?? ''}\n${codeBlock.code}\n\`\`\`\n`;

    case NodeTypes.link:
      const linkBlock = chunk as unknown as MdLinkElement;
      return `[${children}](${linkBlock.url || ''})`;

    case NodeTypes.image:
      const imageBlock = chunk as unknown as MdImageElement;
      const caption = imageBlock.caption ?? [];
      return `![${caption.length > 0 ? caption[0].text ?? '' : ''}](${imageBlock.url || ''})`;

    case NodeTypes.ul_list:
    case NodeTypes.ol_list:
      return `\n${children}`;

    case NodeTypes.listItemContent:
      return children;

    case NodeTypes.listItem:
      const listItemBlock = chunk as unknown as MdListItemElement;

      const isOL = chunk && chunk.parentType === NodeTypes.ol_list;

      const treatAsLeaf =
        (chunk as MdBlockType).children.length >= 1 &&
        ((chunk as MdBlockType).children.reduce((acc, child) => acc && isLeafNode(child), true) ||
          ((chunk as MdBlockType).children[0] as BlockType).type === 'lic');

      let spacer = '';
      for (let k = 0; listDepth > k; k++) {
        if (isOL) {
          // https://github.com/remarkjs/remark-react/issues/65
          spacer += '   ';
        } else {
          spacer += '  ';
        }
      }

      let checkbox = '';
      if (typeof listItemBlock.checked === 'boolean') {
        checkbox = ` [${listItemBlock.checked ? 'X' : ' '}]`;
      }

      return `${spacer}${isOL ? '1.' : '-'}${checkbox} ${children}${treatAsLeaf ? '\n' : ''}`;

    case NodeTypes.paragraph:
      const paragraphNode = chunk as unknown as MdParagraphElement;
      if (paragraphNode.align) {
        return `<p style={{ textAlign: '${paragraphNode.align}' }}>${children}</p>`;
      }
      return `${children}${!isInTable ? '\n' : ''}`;

    case NodeTypes.thematic_break:
      return `---\n`;

    case NodeTypes.table:
      const columns = getTableColumnCount(chunk as TableNode);
      return `|${Array(columns).fill('   ').join('|')}|
|${Array(columns).fill('---').join('|')}|
${children}\n`;

    case NodeTypes.tableRow:
      return `|${children}|\n`;

    case NodeTypes.tableCell:
      return children.replace(/\|/g, '\\|').replace(/\n/g, BREAK_TAG);

    default:
      console.warn('Unrecognized slate node, proceeding as text', `"${type}"`, chunk);
      return children;
  }
}

const reverseStr = (string: string) => string.split('').reverse().join('');

// This function handles the case of a string like this: "   foo   "
// Where it would be invalid markdown to generate this: "**   foo   **"
// We instead, want to trim the whitespace out, apply formatting, and then
// bring the whitespace back. So our returned string looks like this: "   **foo**   "
function retainWhitespaceAndFormat(string: string, format: string, endFormat?: string) {
  // we keep this for a comparison later
  const frozenString = string.trim();

  // children will be mutated
  const children = frozenString;

  // We reverse the right side formatting, to properly handle bold/italic and strikethrough
  // formats, so we can create ~~***FooBar***~~
  const fullFormat = `${format}${children}${endFormat ? endFormat : reverseStr(format)}`;

  // This conditions accounts for no whitespace in our string
  // if we don't have any, we can return early.
  if (children.length === string.length) {
    return fullFormat;
  }

  // if we do have whitespace, let's add our formatting around our trimmed string
  // We reverse the right side formatting, to properly handle bold/italic and strikethrough
  // formats, so we can create ~~***FooBar***~~
  const formattedString = `${format}${children}${endFormat ? endFormat : reverseStr(format)}`;

  // and replace the non-whitespace content of the string
  return string.replace(frozenString, formattedString);
}

function getTableColumnCount(tableNode: TableNode): number {
  const rows = tableNode.children;
  if (rows.length === 0) {
    return 0;
  }

  return rows[0].children.length;
}
