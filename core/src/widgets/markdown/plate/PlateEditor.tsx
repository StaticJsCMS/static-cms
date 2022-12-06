import { styled } from '@mui/material/styles';
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
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { BalloonToolbar } from './components/balloon-toolbar';
import { BlockquoteElement } from './components/nodes/blockquote';
import { CodeBlockElement } from './components/nodes/code-block';
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
import Paragraph from './components/nodes/paragraph/Paragraph';
import { TableCellElement, TableElement, TableRowElement } from './components/nodes/table';
import { Toolbar } from './components/toolbar';
import editableProps from './editableProps';
import { createMdPlugins } from './plateTypes';
import { alignPlugin } from './plugins/align';
import { autoformatPlugin } from './plugins/autoformat';
import { createCodeBlockPlugin } from './plugins/code-block';
import { CursorOverlayContainer } from './plugins/cursor-overlay';
import { exitBreakPlugin } from './plugins/exit-break';
import { createListPlugin } from './plugins/list';
import { resetBlockTypePlugin } from './plugins/reset-node';
import { softBreakPlugin } from './plugins/soft-break';
import { createTablePlugin } from './plugins/table';
import { trailingBlockPlugin } from './plugins/trailing-block';

import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';
import type { AutoformatPlugin } from '@udecode/plate';
import type { CSSProperties, FC } from 'react';
import type { MdEditor, MdValue } from './plateTypes';

const StyledPlateEditor = styled('div')`
  position: relative;
  padding: 1.25rem;
  padding-bottom: 0;
  margin-bottom: 1.25rem;
`;

const styles: Record<string, CSSProperties> = {
  container: { position: 'relative' },
};

export interface PlateEditorProps {
  initialValue: MdValue;
  collection: Collection<MarkdownField>;
  entry: Entry;
  field: MarkdownField;
  onChange: (value: MdValue) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const PlateEditor: FC<PlateEditorProps> = ({
  initialValue,
  collection,
  entry,
  field,
  onChange,
  onFocus,
  onBlur,
}) => {
  const outerEditorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const innerEditorContainerRef = useRef<HTMLDivElement | null>(null);

  const components = useMemo(
    () => ({
      [ELEMENT_H1]: Heading1,
      [ELEMENT_H2]: Heading2,
      [ELEMENT_H3]: Heading3,
      [ELEMENT_H4]: Heading4,
      [ELEMENT_H5]: Heading5,
      [ELEMENT_H6]: Heading6,
      [ELEMENT_PARAGRAPH]: Paragraph,
      [ELEMENT_TABLE]: TableElement,
      [ELEMENT_TR]: TableRowElement,
      [ELEMENT_TH]: TableCellElement,
      [ELEMENT_TD]: TableCellElement,
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_LINK]: withLinkElement({
        containerRef: innerEditorContainerRef.current,
        collection,
        entry,
        field,
      }),
      [ELEMENT_IMAGE]: withImageElement({
        containerRef: innerEditorContainerRef.current,
        collection,
        entry,
        field,
      }),
      [ELEMENT_OL]: OrderedListElement,
      [ELEMENT_UL]: UnorderedListElement,
      [ELEMENT_LI]: ListItemElement,
      [ELEMENT_LIC]: ListItemContentElement,
      [MARK_BOLD]: withProps(StyledLeaf, { as: 'strong' }),
      [MARK_ITALIC]: withProps(StyledLeaf, { as: 'em' }),
      [MARK_STRIKETHROUGH]: withProps(StyledLeaf, { as: 's' }),
      [MARK_SUBSCRIPT]: withProps(StyledLeaf, { as: 'sub' }),
      [MARK_SUPERSCRIPT]: withProps(StyledLeaf, { as: 'sup' }),
      [MARK_UNDERLINE]: withProps(StyledLeaf, { as: 'u' }),
    }),
    [collection, entry, field],
  );

  const [hasEditorFocus, setHasEditorFocus] = useState(false);

  const handleOnFocus = useCallback(() => {
    setHasEditorFocus(true);
    onFocus();
  }, [onFocus]);

  const handleOnBlur = useCallback(() => {
    setHasEditorFocus(false);
    onBlur();
  }, [onBlur]);

  const plugins = useMemo(
    () =>
      createMdPlugins(
        [
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
          createAlignPlugin(alignPlugin),
          createBoldPlugin(),
          createCodePlugin(),
          createItalicPlugin(),
          // createHighlightPlugin(),
          createUnderlinePlugin(),
          createStrikethroughPlugin(),
          createSubscriptPlugin(),
          createSuperscriptPlugin(),
          createFontColorPlugin(),
          createFontBackgroundColorPlugin(),
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
        ],
        {
          components,
        },
      ),
    [components],
  );

  const id = useUUID();

  return useMemo(
    () => (
      <StyledPlateEditor>
        <DndProvider backend={HTML5Backend}>
          <PlateProvider<MdValue>
            id={id}
            key="plate-provider"
            initialValue={initialValue}
            plugins={plugins}
            onChange={onChange}
          >
            <div key="editor-outer_wrapper" ref={outerEditorContainerRef} style={styles.container}>
              <Toolbar
                key="toolbar"
                containerRef={outerEditorContainerRef.current}
                collection={collection}
                field={field}
                entry={entry}
              />

              <div key="editor-wrapper" ref={editorContainerRef} style={styles.container}>
                <Plate
                  key="editor"
                  id={id}
                  editableProps={{
                    ...editableProps,
                    onFocus: handleOnFocus,
                    onBlur: handleOnBlur,
                  }}
                >
                  <div
                    key="editor-inner-wrapper"
                    ref={innerEditorContainerRef}
                    style={styles.container}
                  >
                    <BalloonToolbar
                      key="balloon-toolbar"
                      containerRef={innerEditorContainerRef.current}
                      hasEditorFocus={hasEditorFocus}
                      collection={collection}
                      field={field}
                      entry={entry}
                    />
                    <CursorOverlayContainer containerRef={editorContainerRef} />
                  </div>
                </Plate>
              </div>
            </div>
          </PlateProvider>
        </DndProvider>
      </StyledPlateEditor>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection, field, handleOnBlur, handleOnFocus, initialValue, onChange, plugins],
  );
};

export default PlateEditor;
