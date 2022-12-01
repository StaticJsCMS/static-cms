import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_LINK,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TR,
  ELEMENT_UL,
} from '@udecode/plate';

export const VOID_ELEMENTS = [ELEMENT_CODE_BLOCK, ELEMENT_IMAGE];

export const MarkNodeTypes = {
  superscript_mark: 'superscript',
  subscript_mark: 'subscript',
  underline_mark: 'underline',
} as const;

export const NodeTypes = {
  paragraph: ELEMENT_PARAGRAPH,
  block_quote: ELEMENT_BLOCKQUOTE,
  code_block: ELEMENT_CODE_BLOCK,
  link: ELEMENT_LINK,
  ul_list: ELEMENT_UL,
  ol_list: ELEMENT_OL,
  listItem: ELEMENT_LI,
  listItemContent: ELEMENT_LIC,
  table: ELEMENT_TABLE,
  tableRow: ELEMENT_TR,
  tableCell: ELEMENT_TD,
  heading: {
    1: ELEMENT_H1,
    2: ELEMENT_H2,
    3: ELEMENT_H3,
    4: ELEMENT_H4,
    5: ELEMENT_H5,
    6: ELEMENT_H6,
  },
  emphasis_mark: 'italic',
  strong_mark: 'bold',
  delete_mark: 'strikethrough',
  inline_code_mark: 'code',
  thematic_break: 'thematic_break',
  image: ELEMENT_IMAGE,
  ...MarkNodeTypes,
} as const;

export type MdastNodeType =
  | 'paragraph'
  | 'heading'
  | 'list'
  | 'listItem'
  | 'link'
  | 'image'
  | 'blockquote'
  | 'code'
  | 'html'
  | 'emphasis'
  | 'strong'
  | 'delete'
  | 'inlineCode'
  | 'thematicBreak'
  | 'text'
  | 'mdxJsxTextElement';

export interface LeafType {
  text: string;
  strikethrough?: boolean;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  parentType?: string;
}

export interface BlockType {
  type: string;
  parentType?: string;
  link?: string;
  caption?: string;
  language?: string;
  break?: boolean;
  children: Array<BlockType | LeafType>;
}

export type MdastNode = BaseMdastNode | MdxMdastNode;

export interface BaseMdastNode {
  type?: Omit<MdastNodeType, 'mdxJsxTextElement'>;
  ordered?: boolean;
  value?: string;
  text?: string;
  children?: Array<MdastNode>;
  depth?: 1 | 2 | 3 | 4 | 5 | 6;
  url?: string;
  alt?: string;
  lang?: string;
  // mdast metadata
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  position?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spread?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checked?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  indent?: any;
}

export interface MdxMdastNodeAttributeValue {
  type: 'mdxJsxAttributeValueExpression';
  value: string;
}

export interface StyleMdxMdastNodeAttribute {
  name: 'style';
  type: 'mdxJsxAttribute';
  value: MdxMdastNodeAttributeValue;
}

export interface ColorMdxMdastNodeAttribute {
  name: 'color';
  type: 'mdxJsxAttribute';
  value: string;
}

export interface AlignMdxMdastNodeAttribute {
  name: 'align';
  type: 'mdxJsxAttribute';
  value: string;
}

export type MdxMdastNodeAttribute =
  | StyleMdxMdastNodeAttribute
  | ColorMdxMdastNodeAttribute
  | AlignMdxMdastNodeAttribute;

export interface MdxMdastNode extends BaseMdastNode {
  type: 'mdxJsxTextElement';
  name: string;
  attributes?: MdxMdastNodeAttribute[];
}

export const allowedStyles: string[] = ['color', 'backgroundColor'];

export interface TextNodeStyles {
  color?: string;
  backgroundColor?: string;
}

export type TextNode = { text?: string | undefined } & TextNodeStyles;

export type CodeBlockNode = {
  type: typeof NodeTypes['code_block'];
  lang: string | undefined;
  code: string;
};

export type HeadingNode = {
  type:
    | typeof NodeTypes['heading'][1]
    | typeof NodeTypes['heading'][2]
    | typeof NodeTypes['heading'][3]
    | typeof NodeTypes['heading'][4]
    | typeof NodeTypes['heading'][5]
    | typeof NodeTypes['heading'][6];
  children: Array<DeserializedNode>;
};

export type ListNode = {
  type: typeof NodeTypes['ol_list'] | typeof NodeTypes['ul_list'];
  children: Array<DeserializedNode>;
};

export type ListItemNode = {
  type: typeof NodeTypes['listItem'];
  checked: boolean;
  children: Array<DeserializedNode>;
};

export type ListItemContentNode = {
  type: typeof NodeTypes['listItemContent'];
  children: Array<DeserializedNode>;
};

export type ParagraphNode = {
  type: typeof NodeTypes['paragraph'];
  break?: true;
  children: Array<DeserializedNode>;
};

export type LinkNode = {
  type: typeof NodeTypes['link'];
  children: Array<DeserializedNode>;
  url: string | undefined;
};

export type ImageNode = {
  type: typeof NodeTypes['image'];
  children: Array<DeserializedNode>;
  url: string | undefined;
  caption: TextNode;
};

export type TableNode = {
  type: typeof NodeTypes['table'];
  children: Array<TableRowNode>;
};

export type TableRowNode = {
  type: typeof NodeTypes['tableRow'];
  children: Array<TableCellNode>;
};

export type TableCellNode = {
  type: typeof NodeTypes['tableCell'];
  children: Array<DeserializedNode>;
};

export type BlockQuoteNode = {
  type: typeof NodeTypes['block_quote'];
  children: Array<DeserializedNode>;
};

export type InlineCodeMarkNode = {
  type: typeof NodeTypes['inline_code_mark'];
  children: Array<TextNode>;
  language: string | undefined;
};

export type ThematicBreakNode = {
  type: typeof NodeTypes['thematic_break'];
  children: Array<DeserializedNode>;
};

export type ItalicNode = {
  [K in typeof NodeTypes['emphasis_mark']]: true;
} & {
  children: TextNode;
};

export type MarkNode =
  | SuperscriptNode
  | SubscriptNode
  | UnderlineNode
  | BoldNode
  | StrikeThoughNode
  | InlineCodeNode;

export type SuperscriptNode = {
  [K in typeof NodeTypes['superscript_mark']]: true;
} & {
  children: TextNode;
};

export type SubscriptNode = {
  [K in typeof NodeTypes['subscript_mark']]: true;
} & {
  children: TextNode;
};

export type UnderlineNode = {
  [K in typeof NodeTypes['underline_mark']]: true;
} & {
  children: TextNode;
};

export type BoldNode = {
  bold: true;
  children: TextNode;
};

export type StrikeThoughNode = {
  strikethrough: true;
  children: TextNode;
};

export type InlineCodeNode = {
  code: true;
  text: string | undefined;
};

export type DeserializedNode =
  | CodeBlockNode
  | HeadingNode
  | ListNode
  | ListItemNode
  | ListItemContentNode
  | ParagraphNode
  | LinkNode
  | ImageNode
  | BlockQuoteNode
  | InlineCodeMarkNode
  | ThematicBreakNode
  | ItalicNode
  | TextNode
  | MarkNode;

export const LIST_TYPES: string[] = [NodeTypes.ul_list, NodeTypes.ol_list];
