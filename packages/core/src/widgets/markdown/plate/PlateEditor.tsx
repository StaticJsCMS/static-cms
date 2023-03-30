import {
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createHeadingPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
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
  ELEMENT_TH,
  ELEMENT_TR,
  ELEMENT_UL,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  Plate,
  PlateProvider,
  withProps,
} from '@udecode/plate';
import { StyledLeaf } from '@udecode/plate-styled-components';
import React, { useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { CodeBlockElement, withShortcodeElement } from './components';
import { BalloonToolbar } from './components/balloon-toolbar';
import { BlockquoteElement } from './components/nodes/blockquote';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from './components/nodes/headings';
import { withImageElement } from './components/nodes/image';
import { withLinkElement } from './components/nodes/link';
import {
  ListItemContentElement,
  ListItemElement,
  OrderedListElement,
  UnorderedListElement,
} from './components/nodes/list';
import ParagraphElement from './components/nodes/paragraph/ParagraphElement';
import {
  TableCellElement,
  TableElement,
  TableHeaderCellElement,
  TableRowElement,
} from './components/nodes/table';
import { Toolbar } from './components/toolbar';
import editableProps from './editableProps';
import { createMdPlugins, ELEMENT_SHORTCODE } from './plateTypes';
import { alignPlugin } from './plugins/align';
import { autoformatPlugin } from './plugins/autoformat';
import { createCodeBlockPlugin } from './plugins/code-block';
import { CursorOverlayContainer } from './plugins/cursor-overlay';
import { exitBreakPlugin } from './plugins/exit-break';
import { createListPlugin } from './plugins/list';
import { resetBlockTypePlugin } from './plugins/reset-node';
import { createShortcodePlugin } from './plugins/shortcode';
import { softBreakPlugin } from './plugins/soft-break';
import { createTablePlugin } from './plugins/table';
import { trailingBlockPlugin } from './plugins/trailing-block';

import type {
  Collection,
  Entry,
  MarkdownField,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { AnyObject, AutoformatPlugin, PlatePlugin } from '@udecode/plate';
import type { FC } from 'react';
import type { MdEditor, MdValue } from './plateTypes';

export interface PlateEditorProps {
  initialValue: MdValue;
  collection: Collection<MarkdownField>;
  entry: Entry;
  field: MarkdownField;
  useMdx: boolean;
  controlProps: WidgetControlProps<string, MarkdownField>;
  onChange: (value: MdValue) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const PlateEditor: FC<PlateEditorProps> = ({
  initialValue,
  collection,
  entry,
  field,
  useMdx,
  controlProps,
  onChange,
  onFocus,
  onBlur,
}) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const innerEditorContainerRef = useRef<HTMLDivElement | null>(null);

  const { disabled } = controlProps;

  const components = useMemo(() => {
    const baseComponents = {
      [ELEMENT_H1]: Heading1,
      [ELEMENT_H2]: Heading2,
      [ELEMENT_H3]: Heading3,
      [ELEMENT_H4]: Heading4,
      [ELEMENT_H5]: Heading5,
      [ELEMENT_H6]: Heading6,
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_TABLE]: TableElement,
      [ELEMENT_TR]: TableRowElement,
      [ELEMENT_TH]: TableHeaderCellElement,
      [ELEMENT_TD]: TableCellElement,
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_LINK]: withLinkElement({
        collection,
        field,
      }),
      [ELEMENT_IMAGE]: withImageElement({
        collection,
        entry,
        field,
      }),
      [ELEMENT_OL]: OrderedListElement,
      [ELEMENT_UL]: UnorderedListElement,
      [ELEMENT_LI]: ListItemElement,
      [ELEMENT_LIC]: ListItemContentElement,
      [ELEMENT_SHORTCODE]: withShortcodeElement({ controlProps }),
      [MARK_BOLD]: withProps(StyledLeaf, { as: 'strong' }),
      [MARK_ITALIC]: withProps(StyledLeaf, { as: 'em' }),
      [MARK_STRIKETHROUGH]: withProps(StyledLeaf, { as: 's' }),
    };

    if (useMdx) {
      // MDX Widget
      return {
        ...baseComponents,
        [MARK_SUBSCRIPT]: withProps(StyledLeaf, { as: 'sub' }),
        [MARK_SUPERSCRIPT]: withProps(StyledLeaf, { as: 'sup' }),
        [MARK_UNDERLINE]: withProps(StyledLeaf, { as: 'u' }),
      };
    }

    // Markdown widget
    return {
      ...baseComponents,
      [ELEMENT_SHORTCODE]: withShortcodeElement({ controlProps }),
    };
  }, [collection, controlProps, entry, field, useMdx]);

  const plugins = useMemo(() => {
    const basePlugins: PlatePlugin<AnyObject, MdValue>[] = [
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      // createHorizontalRulePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      // createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      // createHighlightPlugin(),
      createStrikethroughPlugin(),
      // createFontSizePlugin(),
      // createKbdPlugin(),
      // createNodeIdPlugin(),
      // createDndPlugin({ options: { enableScroller: true } }),
      // dragOverCursorPlugin,
      // createIndentPlugin(indentPlugin),
      createAutoformatPlugin<AutoformatPlugin<MdValue, MdEditor>, MdValue, MdEditor>(
        autoformatPlugin,
      ),
      createResetNodePlugin(resetBlockTypePlugin),
      createSoftBreakPlugin(softBreakPlugin),
      createExitBreakPlugin(exitBreakPlugin),
      createTrailingBlockPlugin(trailingBlockPlugin),
      // createSelectOnBackspacePlugin(selectOnBackspacePlugin),
      // createComboboxPlugin(),
      // createMentionPlugin(),
      // createDeserializeMdPlugin(),
      // createDeserializeCsvPlugin(),
      // createDeserializeDocxPlugin(),
      // createJuicePlugin() as MdPlatePlugin,
    ];

    if (useMdx) {
      // MDX Widget
      return createMdPlugins(
        [
          ...basePlugins,
          createFontColorPlugin(),
          createFontBackgroundColorPlugin(),
          createSubscriptPlugin(),
          createSuperscriptPlugin(),
          createUnderlinePlugin(),
          createAlignPlugin(alignPlugin),
        ],
        {
          components,
        },
      );
    }

    // Markdown Widget
    return createMdPlugins([...basePlugins, createShortcodePlugin()], {
      components,
    });
  }, [components, useMdx]);

  const id = useUUID();

  return useMemo(
    () => (
      <div className="relative px-3 py-5 pb-0 mb-5">
        <DndProvider backend={HTML5Backend}>
          <PlateProvider<MdValue>
            id={id}
            key="plate-provider"
            initialValue={initialValue}
            plugins={plugins}
            onChange={onChange}
            readOnly={disabled}
          >
            <div key="editor-outer_wrapper">
              <Toolbar
                key="toolbar"
                useMdx={useMdx}
                collection={collection}
                field={field}
                disabled={disabled}
              />

              <div key="editor-wrapper" ref={editorContainerRef} className="w-full overflow-hidden">
                <Plate
                  key="editor"
                  id={id}
                  editableProps={{
                    ...editableProps,
                    onFocus,
                    onBlur,
                  }}
                >
                  <div key="editor-inner-wrapper" ref={innerEditorContainerRef}>
                    <BalloonToolbar
                      key="balloon-toolbar"
                      useMdx={useMdx}
                      containerRef={innerEditorContainerRef.current}
                      collection={collection}
                      field={field}
                      disabled={disabled}
                    />
                    <CursorOverlayContainer containerRef={editorContainerRef} />
                  </div>
                </Plate>
              </div>
            </div>
          </PlateProvider>
        </DndProvider>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection, field, onBlur, onFocus, initialValue, onChange, plugins],
  );
};

export default PlateEditor;
