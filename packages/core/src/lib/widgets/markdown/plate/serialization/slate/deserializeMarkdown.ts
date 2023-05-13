/* eslint-disable no-case-declarations */
import { ELEMENT_PARAGRAPH } from '@udecode/plate';

import { LIST_TYPES, MarkNodeTypes, NodeTypes } from './ast-types';
import { autoLinkToSlate } from './autoLinkUrls';
import { processShortcodeConfigsToSlate } from './processShortcodeConfig';

import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { MdBlockElement } from '@staticcms/markdown';
import type {
  AlignMdxMdastNodeAttribute,
  BlockQuoteNode,
  CodeBlockNode,
  ColorMdxMdastNodeAttribute,
  DeserializedNode,
  HeadingNode,
  ImageNode,
  ItalicNode,
  LinkNode,
  ListItemNode,
  ListNode,
  MarkNode,
  MdastNode,
  MdxTextMdastNode,
  ParagraphNode,
  StyleMdxMdastNodeAttribute,
  TextNode,
  TextNodeStyles,
  ThematicBreakNode,
} from './ast-types';

const forceLeafNode = (children: Array<TextNode>) => ({
  text: children.map(k => k?.text).join(''),
});

// This function is will take any unknown keys, and bring them up a level
// allowing leaf nodes to have many different formats at once
// for example, bold and italic on the same node
function persistLeafFormats(
  children: Array<MdastNode>,
): Omit<MdastNode, 'children' | 'type' | 'text'> {
  return children.reduce((acc, node) => {
    (Object.keys(node) as Array<keyof MdastNode>).forEach(function (key) {
      if (key === 'children' || key === 'type' || key === 'text') {
        return;
      }

      acc[key] = node[key];
    });

    return acc;
  }, {});
}

function mdxToMark(mark: keyof typeof MarkNodeTypes, children: DeserializedNode[]): MarkNode {
  return {
    [MarkNodeTypes[mark] as string]: true,
    ...forceLeafNode(children as Array<TextNode>),
    ...persistLeafFormats(children as Array<MdastNode>),
  } as MarkNode;
}

function parseStyleAttribute(node: MdxTextMdastNode, allowedStyles: Record<string, string>) {
  const styleAttribute = node.attributes?.find(
    a => a.name === 'style',
  ) as StyleMdxMdastNodeAttribute;
  const nodeStyles: TextNodeStyles = {};
  if (styleAttribute) {
    let styles: Record<string, string> = {};
    try {
      styles =
        JSON.parse(
          styleAttribute.value.value
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
            .replace(/:[ ]*[']([^']+)[']/g, ': "$1"'),
        ) ?? {};
    } catch (e) {
      console.error(`Error parsing font styles (${styleAttribute.value.value})`, e);
    }

    Object.keys(styles).map(key => {
      if (key in allowedStyles) {
        nodeStyles[allowedStyles[key] as keyof TextNodeStyles] = styles[key];
      }
    });
  }

  return nodeStyles;
}

export interface Options {
  isInTable?: boolean;
  isInTableHeaderRow?: boolean;
  tableAlign?: (string | null)[];
  useMdx: boolean;
  shortcodeConfigs: Record<string, ShortcodeConfig>;
  index: number;
}

export default function deserializeMarkdown(node: MdastNode, options: Options) {
  let children: Array<DeserializedNode> = [{ text: '' }];

  const {
    isInTable = false,
    isInTableHeaderRow = false,
    tableAlign,
    useMdx,
    shortcodeConfigs,
    index,
  } = options ?? {};

  const selfIsTable = node.type === 'table';
  const selfIsTableHeaderRow = node.type === 'tableRow' && index === 0;

  const nodeChildren = node.children;
  if (nodeChildren && Array.isArray(nodeChildren) && nodeChildren.length > 0) {
    children = nodeChildren.flatMap(
      (c: MdastNode, childIndex) =>
        deserializeMarkdown(
          {
            ...c,
            ordered: node.ordered || c.ordered || false,
          },
          {
            isInTable: selfIsTable || isInTable,
            isInTableHeaderRow: selfIsTableHeaderRow || isInTableHeaderRow,
            useMdx,
            shortcodeConfigs,
            index: childIndex,
            tableAlign: tableAlign || (selfIsTable ? node.align : undefined),
          },
        ) as DeserializedNode,
    );
  }

  switch (node.type) {
    case 'heading':
      return {
        type: NodeTypes.heading[node.depth || 1],
        children,
      } as HeadingNode;

    case 'list':
      return {
        type: node.ordered ? NodeTypes.ol_list : NodeTypes.ul_list,
        children,
      } as ListNode;

    case 'listItem':
      const [content, childList] = children.reduce(
        ([accContent, accChildList], child) => {
          if ('type' in child && LIST_TYPES.includes(child.type)) {
            return [accContent, child];
          }

          accContent.push(child);
          return [accContent, accChildList];
        },
        [[], null] as [DeserializedNode[], DeserializedNode | null],
      );

      const listItemChildren: DeserializedNode[] = [
        {
          type: NodeTypes.listItemContent,
          children: content,
        },
      ];

      if (childList) {
        listItemChildren.push(childList);
      }

      return {
        type: NodeTypes.listItem,
        checked: node.checked,
        children: listItemChildren,
      } as ListItemNode;

    case 'paragraph':
      if ('ordered' in node) {
        return children;
      }

      if (
        Array.isArray(children) &&
        children.length === 1 &&
        'type' in children[0] &&
        (children[0] as MdBlockElement).type === ELEMENT_PARAGRAPH
      ) {
        return children[0];
      }

      return { type: NodeTypes.paragraph, children } as ParagraphNode;

    case 'link':
      return {
        type: NodeTypes.link,
        url: node.url,
        children,
      } as LinkNode;

    case 'image':
      return {
        type: NodeTypes.image,
        children: [{ text: '' }],
        url: node.url,
        alt: node.alt,
      } as ImageNode;

    case 'blockquote':
      return { type: NodeTypes.block_quote, children } as BlockQuoteNode;

    case 'code':
      return {
        type: NodeTypes.code_block,
        lang: node.lang,
        code: node.value,
        children: [{ text: '' }],
      } as CodeBlockNode;

    case 'html':
      if (node.value?.includes('<br>')) {
        return {
          break: true,
          type: NodeTypes.paragraph,
          children: [{ text: node.value?.replace(/<br>/g, '') || '' }],
        } as ParagraphNode;
      }
      return { type: 'p', children: [{ text: node.value || '' }] };

    case 'emphasis':
      return {
        [NodeTypes.emphasis_mark]: true,
        ...forceLeafNode(children as Array<TextNode>),
        ...persistLeafFormats(children as Array<MdastNode>),
      } as unknown as ItalicNode;
    case 'strong':
      return {
        [NodeTypes.strong_mark]: true,
        ...forceLeafNode(children as Array<TextNode>),
        ...persistLeafFormats(children as Array<MdastNode>),
      };
    case 'delete':
      return {
        [NodeTypes.delete_mark]: true,
        ...forceLeafNode(children as Array<TextNode>),
        ...persistLeafFormats(children as Array<MdastNode>),
      };
    case 'inlineCode':
      return {
        [NodeTypes.inline_code_mark]: true,
        text: node.value,
        ...persistLeafFormats(children as Array<MdastNode>),
      };
    case 'thematicBreak':
      return {
        type: NodeTypes.thematic_break,
        children: [{ text: '' }],
      } as ThematicBreakNode;

    case 'table':
      return { type: NodeTypes.table, children };

    case 'tableRow':
      return { type: NodeTypes.tableRow, children };

    case 'tableCell':
      return {
        type: isInTableHeaderRow ? NodeTypes.tableHeaderCell : NodeTypes.tableCell,
        children: [{ type: NodeTypes.paragraph, children }],
      };

    case 'mdxJsxFlowElement':
      if ('name' in node) {
        switch (node.name) {
          case 'br':
            return { type: NodeTypes.paragraph, children: [{ text: '' }] };
          default:
            console.warn('[StaticCMS] Unrecognized mdx flow element', node);
            break;
        }
      }

      return { text: node.value || '' };

    case 'mdxJsxTextElement':
      if ('name' in node && node.type === 'mdxJsxTextElement') {
        switch (node.name) {
          case 'br':
            return [{ text: '\n' }];
          case 'sub':
            return mdxToMark('subscript_mark', children);
          case 'sup':
            return mdxToMark('superscript_mark', children);
          case 'u':
            return mdxToMark('underline_mark', children);
          case 'p':
            const paragraphNodeStyles = parseStyleAttribute(node, { textAlign: 'align' });

            const alignAttribute = node.attributes?.find(
              a => a.name === 'align',
            ) as AlignMdxMdastNodeAttribute;
            const pNodeStyles: Record<string, string> = {};
            if (alignAttribute) {
              pNodeStyles['align'] = alignAttribute.value;
            }

            return {
              type: NodeTypes.paragraph,
              ...paragraphNodeStyles,
              ...pNodeStyles,
              children: [
                {
                  ...forceLeafNode(children as Array<TextNode>),
                  ...persistLeafFormats(children as Array<MdastNode>),
                },
              ],
            } as ParagraphNode;
          case 'font':
            const fontNodeStyles = parseStyleAttribute(node, {
              color: 'color',
              backgroundColor: 'backgroundColor',
            });

            const colorAttribute = node.attributes?.find(
              a => a.name === 'color',
            ) as ColorMdxMdastNodeAttribute;
            if (colorAttribute) {
              fontNodeStyles.color = colorAttribute.value;
            }

            return {
              ...fontNodeStyles,
              ...forceLeafNode(children as Array<TextNode>),
              ...persistLeafFormats(children as Array<MdastNode>),
            } as TextNode;
          default:
            console.warn('[StaticCMS] Unrecognized mdx text element', node);
            break;
        }
      }

      return { text: node.value || '' };

    case 'text':
      if (useMdx) {
        return { text: node.value || '' };
      }

      if (!node.value) {
        return { text: '' };
      }

      const nodes = autoLinkToSlate(processShortcodeConfigsToSlate(shortcodeConfigs, [node]));

      return nodes.map(node => (node.type === 'text' ? { text: node.value ?? '' } : node));

    default:
      console.warn('[StaticCMS] Unrecognized mdast node, proceeding as text', node);
      return { text: node.value || '' };
  }
}
