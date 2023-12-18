export declare const VOID_ELEMENTS: string[];
export declare const MarkNodeTypes: {
    readonly superscript_mark: "superscript";
    readonly subscript_mark: "subscript";
    readonly underline_mark: "underline";
};
export declare const NodeTypes: {
    readonly superscript_mark: "superscript";
    readonly subscript_mark: "subscript";
    readonly underline_mark: "underline";
    readonly paragraph: "p";
    readonly block_quote: "blockquote";
    readonly code_block: "code_block";
    readonly link: "a";
    readonly ul_list: "ul";
    readonly ol_list: "ol";
    readonly listItem: "li";
    readonly listItemContent: "lic";
    readonly table: "table";
    readonly tableRow: "tr";
    readonly tableCell: "td";
    readonly tableHeaderCell: "th";
    readonly heading: {
        readonly 1: "h1";
        readonly 2: "h2";
        readonly 3: "h3";
        readonly 4: "h4";
        readonly 5: "h5";
        readonly 6: "h6";
    };
    readonly shortcode: "shortcode";
    readonly emphasis_mark: "italic";
    readonly strong_mark: "bold";
    readonly delete_mark: "strikethrough";
    readonly inline_code_mark: "code";
    readonly thematic_break: "thematic_break";
    readonly image: "img";
};
export type MdastNodeType = 'paragraph' | 'heading' | 'list' | 'listItem' | 'link' | 'image' | 'blockquote' | 'code' | 'html' | 'emphasis' | 'strong' | 'delete' | 'inlineCode' | 'thematicBreak' | 'text' | 'mdxJsxTextElement';
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
    alt?: string;
    language?: string;
    break?: boolean;
    children: Array<BlockType | LeafType>;
}
export interface ShortcodeNode extends BaseMdastNode {
    type: 'shortcode';
    shortcode: string;
    args: string[];
}
export type MdastNode = BaseMdastNode | MdxTextMdastNode | MdxFlowMdastNode | ShortcodeNode;
export interface BaseMdastNode {
    type?: Omit<MdastNodeType, 'mdxJsxTextElement'>;
    ordered?: boolean;
    value?: string;
    text?: string;
    children?: Array<MdastNode>;
    depth?: 1 | 2 | 3 | 4 | 5 | 6;
    url?: string;
    alt?: string;
    lang?: string | null;
    title?: string | null;
    start?: number | null;
    meta?: null;
    position?: any;
    spread?: any;
    checked?: any;
    indent?: any;
    align?: (string | null)[];
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
export type MdxMdastNodeAttribute = StyleMdxMdastNodeAttribute | ColorMdxMdastNodeAttribute | AlignMdxMdastNodeAttribute;
export interface MdxTextMdastNode extends BaseMdastNode {
    type: 'mdxJsxTextElement';
    name: string;
    attributes?: MdxMdastNodeAttribute[];
}
export interface MdxFlowMdastNode extends BaseMdastNode {
    type: 'mdxJsxFlowElement';
    name: string;
}
export interface TextNodeStyles {
    color?: string;
    backgroundColor?: string;
}
export type TextNode = {
    text?: string | undefined;
} & TextNodeStyles;
export type CodeBlockNode = {
    type: (typeof NodeTypes)['code_block'];
    lang: string | undefined;
    code: string;
};
export type HeadingNode = {
    type: (typeof NodeTypes)['heading'][1] | (typeof NodeTypes)['heading'][2] | (typeof NodeTypes)['heading'][3] | (typeof NodeTypes)['heading'][4] | (typeof NodeTypes)['heading'][5] | (typeof NodeTypes)['heading'][6];
    children: Array<DeserializedNode>;
};
export type ListNode = {
    type: (typeof NodeTypes)['ol_list'] | (typeof NodeTypes)['ul_list'];
    children: Array<DeserializedNode>;
};
export type ListItemNode = {
    type: (typeof NodeTypes)['listItem'];
    checked: boolean;
    children: Array<DeserializedNode>;
};
export type ListItemContentNode = {
    type: (typeof NodeTypes)['listItemContent'];
    children: Array<DeserializedNode>;
};
export type ParagraphNode = {
    type: (typeof NodeTypes)['paragraph'];
    break?: true;
    children: Array<DeserializedNode>;
};
export type LinkNode = {
    type: (typeof NodeTypes)['link'];
    children: Array<DeserializedNode>;
    url: string | undefined;
};
export type ImageNode = {
    type: (typeof NodeTypes)['image'];
    children: Array<DeserializedNode>;
    url: string | undefined;
    alt: string | undefined;
};
export type TableNode = {
    type: (typeof NodeTypes)['table'];
    children: Array<TableRowNode>;
};
export type TableRowNode = {
    type: (typeof NodeTypes)['tableRow'];
    children: Array<TableCellNode>;
};
export type TableCellNode = {
    type: (typeof NodeTypes)['tableCell'];
    children: Array<DeserializedNode>;
};
export type BlockQuoteNode = {
    type: (typeof NodeTypes)['block_quote'];
    children: Array<DeserializedNode>;
};
export type InlineCodeMarkNode = {
    type: (typeof NodeTypes)['inline_code_mark'];
    children: Array<TextNode>;
    language: string | undefined;
};
export type ThematicBreakNode = {
    type: (typeof NodeTypes)['thematic_break'];
    children: Array<DeserializedNode>;
};
export type ItalicNode = {
    [K in (typeof NodeTypes)['emphasis_mark']]: true;
} & {
    children: TextNode;
};
export type MarkNode = SuperscriptNode | SubscriptNode | UnderlineNode | BoldNode | StrikeThoughNode | InlineCodeNode;
export type SuperscriptNode = {
    [K in (typeof NodeTypes)['superscript_mark']]: true;
} & {
    children: TextNode;
};
export type SubscriptNode = {
    [K in (typeof NodeTypes)['subscript_mark']]: true;
} & {
    children: TextNode;
};
export type UnderlineNode = {
    [K in (typeof NodeTypes)['underline_mark']]: true;
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
export type DeserializedNode = CodeBlockNode | HeadingNode | ListNode | ListItemNode | ListItemContentNode | ParagraphNode | LinkNode | ImageNode | BlockQuoteNode | InlineCodeMarkNode | ThematicBreakNode | ItalicNode | TextNode | MarkNode;
export declare const LIST_TYPES: string[];
