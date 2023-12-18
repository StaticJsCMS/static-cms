import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { Plugin } from 'unified';
import type { MdastNode } from './ast-types';
export interface ToSlatePluginOptions {
    shortcodeConfigs: Record<string, ShortcodeConfig>;
    useMdx: boolean;
}
export declare const slateCompiler: ({ shortcodeConfigs, useMdx }: ToSlatePluginOptions) => (node: MdastNode) => (MdastNode[] | import("./ast-types").TextNode | import("./ast-types").CodeBlockNode | import("./ast-types").HeadingNode | import("./ast-types").ListNode | import("./ast-types").ListItemNode | import("./ast-types").ListItemContentNode | import("./ast-types").ParagraphNode | import("./ast-types").LinkNode | import("./ast-types").ImageNode | import("./ast-types").BlockQuoteNode | import("./ast-types").InlineCodeMarkNode | import("./ast-types").ThematicBreakNode | import("./ast-types").ItalicNode | import("./ast-types").SuperscriptNode | import("./ast-types").SubscriptNode | import("./ast-types").UnderlineNode | import("./ast-types").BoldNode | import("./ast-types").StrikeThoughNode | import("./ast-types").InlineCodeNode | import("./ast-types").DeserializedNode[] | {
    type: string;
    children: {
        text: string;
    }[];
} | {
    meta?: null | undefined;
    title?: string | null | undefined;
    value?: string | undefined;
    url?: string | undefined;
    depth?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    align?: (string | null)[] | undefined;
    alt?: string | undefined;
    lang?: string | null | undefined;
    checked?: any;
    start?: number | null | undefined;
    position?: any;
    indent?: any;
    ordered?: boolean | undefined;
    spread?: any;
    text: string;
    bold: boolean;
    type?: undefined;
    children?: undefined;
} | {
    meta?: null | undefined;
    title?: string | null | undefined;
    value?: string | undefined;
    url?: string | undefined;
    depth?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    align?: (string | null)[] | undefined;
    alt?: string | undefined;
    lang?: string | null | undefined;
    checked?: any;
    start?: number | null | undefined;
    position?: any;
    indent?: any;
    ordered?: boolean | undefined;
    spread?: any;
    text: string;
    strikethrough: boolean;
    type?: undefined;
    children?: undefined;
} | {
    meta?: null | undefined;
    title?: string | null | undefined;
    value?: string | undefined;
    url?: string | undefined;
    depth?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    align?: (string | null)[] | undefined;
    alt?: string | undefined;
    lang?: string | null | undefined;
    checked?: any;
    start?: number | null | undefined;
    position?: any;
    indent?: any;
    ordered?: boolean | undefined;
    spread?: any;
    code: boolean;
    text: string | undefined;
    type?: undefined;
    children?: undefined;
} | {
    type: "table";
    children: import("./ast-types").DeserializedNode[];
} | {
    type: "tr";
    children: import("./ast-types").DeserializedNode[];
} | {
    type: "td" | "th";
    children: {
        type: "p";
        children: import("./ast-types").DeserializedNode[];
    }[];
})[];
declare const toSlatePlugin: (options: ToSlatePluginOptions) => Plugin;
export default toSlatePlugin;
