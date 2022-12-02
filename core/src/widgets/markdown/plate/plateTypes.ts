import {
  createPlateEditor,
  createPluginFactory,
  createPlugins,
  createTEditor,
  getTEditor,
  useEditorRef,
  useEditorState,
  usePlateActions,
  usePlateEditorRef,
  usePlateEditorState,
  usePlateSelectors,
  usePlateStates,
} from '@udecode/plate';

import type {
  AutoformatRule,
  CreatePlateEditorOptions,
  Decorate,
  DecorateEntry,
  DOMHandler,
  EDescendant,
  EElement,
  EElementEntry,
  EElementOrText,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_LI,
  ELEMENT_LINK,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TR,
  ELEMENT_UL,
  EMarks,
  ENode,
  ENodeEntry,
  EText,
  ETextEntry,
  InjectComponent,
  InjectProps,
  KeyboardHandler,
  NoInfer,
  OnChange,
  OverrideByKey,
  PlateEditor,
  PlateId,
  PlatePlugin,
  PlatePluginComponent,
  PlatePluginInsertData,
  PlatePluginProps,
  PlateProps,
  PluginOptions,
  SerializeHtml,
  TElement,
  TImageElement,
  TLinkElement,
  TMediaEmbedElement,
  TMentionElement,
  TMentionInputElement,
  TNodeEntry,
  TReactEditor,
  TTableElement,
  TText,
  WithOverride,
} from '@udecode/plate';
import type { CSSProperties } from 'styled-components';

/**
 * Text
 */

export type EmptyText = {
  text: '';
};

export type PlainText = {
  text: string;
};

export interface RichText extends TText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  kbd?: boolean;
  subscript?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  fontFamily?: CSSProperties['fontFamily'];
  color?: CSSProperties['color'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
}

/**
 * Inline Elements
 */

export interface MdLinkElement extends TLinkElement {
  type: typeof ELEMENT_LINK;
  children: RichText[];
}

export interface MdMentionInputElement extends TMentionInputElement {
  type: typeof ELEMENT_MENTION_INPUT;
  children: [PlainText];
}

export interface MdMentionElement extends TMentionElement {
  type: typeof ELEMENT_MENTION;
  children: [EmptyText];
}

export type MdInlineElement = MdLinkElement | MdMentionElement | MdMentionInputElement;
export type MdInlineDescendant = MdInlineElement | RichText;
export type MdInlineChildren = MdInlineDescendant[];

/**
 * Block props
 */

export interface MdIndentProps {
  indent?: number;
}

export interface MdIndentListProps extends MdIndentProps {
  listStart?: number;
  listRestart?: number;
  listStyleType?: string;
}

export interface MdLineHeightProps {
  lineHeight?: CSSProperties['lineHeight'];
}

export interface MdAlignProps {
  align?: CSSProperties['textAlign'];
}

export interface MdBlockElement extends TElement, MdIndentListProps, MdLineHeightProps {
  id?: PlateId;
}

/**
 * Blocks
 */

export interface MdParagraphElement extends MdBlockElement {
  type: typeof ELEMENT_PARAGRAPH;
  children: MdInlineChildren;
  align?: 'left' | 'center' | 'right';
}

export interface MdH1Element extends MdBlockElement {
  type: typeof ELEMENT_H1;
  children: MdInlineChildren;
}

export interface MdH2Element extends MdBlockElement {
  type: typeof ELEMENT_H2;
  children: MdInlineChildren;
}

export interface MdH3Element extends MdBlockElement {
  type: typeof ELEMENT_H3;
  children: MdInlineChildren;
}

export interface MdH4Element extends MdBlockElement {
  type: typeof ELEMENT_H4;
  children: MdInlineChildren;
}

export interface MdH5Element extends MdBlockElement {
  type: typeof ELEMENT_H5;
  children: MdInlineChildren;
}

export interface MdH6Element extends MdBlockElement {
  type: typeof ELEMENT_H6;
  children: MdInlineChildren;
}

export interface MdBlockquoteElement extends MdBlockElement {
  type: typeof ELEMENT_BLOCKQUOTE;
  children: MdInlineChildren;
}

export interface MdCodeBlockElement extends MdBlockElement {
  type: typeof ELEMENT_CODE_BLOCK;
  lang: string | undefined;
  code: string;
}

export interface MdCodeLineElement extends TElement {
  type: typeof ELEMENT_CODE_LINE;
  children: PlainText[];
}

export interface MdTableElement extends TTableElement, MdBlockElement {
  type: typeof ELEMENT_TABLE;
  children: MdTableRowElement[];
}

export interface MdTableRowElement extends TElement {
  type: typeof ELEMENT_TR;
  children: MdTableCellElement[];
}

export interface MdTableCellElement extends TElement {
  type: typeof ELEMENT_TD;
  children: MdNestableBlock[];
}

export interface MdBulletedListElement extends TElement, MdBlockElement {
  type: typeof ELEMENT_UL;
  children: MdListItemElement[];
}

export interface MdNumberedListElement extends TElement, MdBlockElement {
  type: typeof ELEMENT_OL;
  children: MdListItemElement[];
}

export interface MdListItemElement extends TElement, MdBlockElement {
  type: typeof ELEMENT_LI;
  checked: boolean | null;
  children: MdInlineChildren;
}

export interface MdImageElement extends TImageElement, MdBlockElement {
  type: typeof ELEMENT_IMAGE;
  alt?: string;
  children: [EmptyText];
}

export interface MdMediaEmbedElement extends TMediaEmbedElement, MdBlockElement {
  type: typeof ELEMENT_MEDIA_EMBED;
  children: [EmptyText];
}

export interface MdHrElement extends MdBlockElement {
  type: typeof ELEMENT_HR;
  children: [EmptyText];
}

export type MdNestableBlock = MdParagraphElement;

export type MdBlock = Exclude<MdElement, MdInlineElement>;
export type MdBlockEntry = TNodeEntry<MdBlock>;

export type MdRootBlock =
  | MdParagraphElement
  | MdH1Element
  | MdH2Element
  | MdH3Element
  | MdH4Element
  | MdH5Element
  | MdH6Element
  | MdBlockquoteElement
  | MdCodeBlockElement
  | MdTableElement
  | MdBulletedListElement
  | MdNumberedListElement
  | MdImageElement
  | MdMediaEmbedElement
  | MdHrElement;

export type MdValue = MdRootBlock[];

/**
 * Editor types
 */

export type MdEditor = PlateEditor<MdValue> & { isDragging?: boolean };
export type MdReactEditor = TReactEditor<MdValue>;
export type MdNode = ENode<MdValue>;
export type MdNodeEntry = ENodeEntry<MdValue>;
export type MdElement = EElement<MdValue>;
export type MdElementEntry = EElementEntry<MdValue>;
export type MdText = EText<MdValue>;
export type MdTextEntry = ETextEntry<MdValue>;
export type MdElementOrText = EElementOrText<MdValue>;
export type MdDescendant = EDescendant<MdValue>;
export type MdMarks = EMarks<MdValue>;
export type MdMark = keyof MdMarks;

/**
 * Plate types
 */

export type MdDecorate<P = PluginOptions> = Decorate<P, MdValue, MdEditor>;
export type MdDecorateEntry = DecorateEntry<MdValue>;
export type MdDOMHandler<P = PluginOptions> = DOMHandler<P, MdValue, MdEditor>;
export type MdInjectComponent = InjectComponent<MdValue>;
export type MdInjectProps = InjectProps<MdValue>;
export type MdKeyboardHandler<P = PluginOptions> = KeyboardHandler<P, MdValue, MdEditor>;
export type MdOnChange<P = PluginOptions> = OnChange<P, MdValue, MdEditor>;
export type MdOverrideByKey = OverrideByKey<MdValue, MdEditor>;
export type MdPlatePlugin<P = PluginOptions> = PlatePlugin<P, MdValue, MdEditor>;
export type MdPlatePluginInsertData = PlatePluginInsertData<MdValue>;
export type MdPlatePluginProps = PlatePluginProps<MdValue>;
export type MdPlateProps = PlateProps<MdValue, MdEditor>;
export type MdSerializeHtml = SerializeHtml<MdValue>;
export type MdWithOverride<P = PluginOptions> = WithOverride<P, MdValue, MdEditor>;

/**
 * Plate store, Slate context
 */

export const getMdEditor = (editor: MdEditor) => getTEditor<MdValue, MdEditor>(editor);
export const useMdEditorRef = () => useEditorRef<MdValue, MdEditor>();
export const useMdEditorState = () => useEditorState<MdValue, MdEditor>();
export const useMdPlateEditorRef = (id?: PlateId) => usePlateEditorRef<MdValue, MdEditor>(id);
export const useMdPlateEditorState = (id?: PlateId) => usePlateEditorState<MdValue, MdEditor>(id);
export const useMdPlateSelectors = (id?: PlateId) => usePlateSelectors<MdValue, MdEditor>(id);
export const useMdPlateActions = (id?: PlateId) => usePlateActions<MdValue, MdEditor>(id);
export const useMdPlateStates = (id?: PlateId) => usePlateStates<MdValue, MdEditor>(id);

/**
 * Utils
 */
export const createMdEditor = () => createTEditor() as MdEditor;
export const createMdPlateEditor = (options: CreatePlateEditorOptions<MdValue, MdEditor> = {}) =>
  createPlateEditor<MdValue, MdEditor>(options);
export const createMdPluginFactory = <P = PluginOptions>(
  defaultPlugin: PlatePlugin<NoInfer<P>, MdValue, MdEditor>,
) => createPluginFactory(defaultPlugin);
export const createMdPlugins = (
  plugins: MdPlatePlugin[],
  options?: {
    components?: Record<string, PlatePluginComponent>;
    overrideByKey?: MdOverrideByKey;
  },
) => createPlugins<MdValue, MdEditor>(plugins, options);

export type MdAutoformatRule = AutoformatRule<MdValue, MdEditor>;
