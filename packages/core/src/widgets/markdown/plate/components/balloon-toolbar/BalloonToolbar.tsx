import { Popper } from '@mui/base/Popper';
import {
  ELEMENT_LINK,
  ELEMENT_TD,
  getNode,
  getSelectionBoundingClientRect,
  getSelectionText,
  isElement,
  isElementEmpty,
  isSelectionExpanded,
  isText,
  someNode,
  usePlateSelection,
} from '@udecode/plate';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFocused } from 'slate-react';

import {
  BOLD_TOOLBAR_BUTTON,
  CODE_TOOLBAR_BUTTON,
  DELETE_COLUMN_TOOLBAR_BUTTON,
  DELETE_ROW_TOOLBAR_BUTTON,
  DELETE_TABLE_TOOLBAR_BUTTON,
  FILE_LINK_TOOLBAR_BUTTON,
  FONT_TOOLBAR_BUTTON,
  IMAGE_TOOLBAR_BUTTON,
  INSERT_COLUMN_TOOLBAR_BUTTON,
  INSERT_ROW_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  SHORTCODE_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
} from '@staticcms/core/constants/toolbar_buttons';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectVisible } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import { getToolbarButtons } from '../../hooks/useToolbarButtons';

import type {
  CollectionWithDefaults,
  MarkdownField,
  MarkdownToolbarButtonType,
} from '@staticcms/core/interface';
import type { ClientRectObject } from '@udecode/plate';
import type { FC, ReactNode } from 'react';

import './BalloonToolbar.css';

const classes = generateClassNames('WidgetMarkdown_BalloonToolbar', ['root', 'popper', 'content']);

const DEFAULT_EMPTY_BUTTONS: MarkdownToolbarButtonType[] = [];

const DEFAULT_SELECTION_BUTTONS: MarkdownToolbarButtonType[] = [
  BOLD_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  CODE_TOOLBAR_BUTTON,
  FONT_TOOLBAR_BUTTON,
  FILE_LINK_TOOLBAR_BUTTON,
];

const DEFAULT_TABLE_EMPTY_BUTTONS: MarkdownToolbarButtonType[] = [
  BOLD_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  CODE_TOOLBAR_BUTTON,
  INSERT_ROW_TOOLBAR_BUTTON,
  DELETE_ROW_TOOLBAR_BUTTON,
  INSERT_COLUMN_TOOLBAR_BUTTON,
  DELETE_COLUMN_TOOLBAR_BUTTON,
  DELETE_TABLE_TOOLBAR_BUTTON,
  FILE_LINK_TOOLBAR_BUTTON,
  IMAGE_TOOLBAR_BUTTON,
  SHORTCODE_TOOLBAR_BUTTON,
];

const DEFAULT_TABLE_SELECTION_BUTTONS: MarkdownToolbarButtonType[] = [
  BOLD_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  CODE_TOOLBAR_BUTTON,
  INSERT_ROW_TOOLBAR_BUTTON,
  DELETE_ROW_TOOLBAR_BUTTON,
  INSERT_COLUMN_TOOLBAR_BUTTON,
  DELETE_COLUMN_TOOLBAR_BUTTON,
  DELETE_TABLE_TOOLBAR_BUTTON,
  FILE_LINK_TOOLBAR_BUTTON,
];

export interface BalloonToolbarProps {
  useMdx: boolean;
  containerRef: HTMLElement | null;
  collection: CollectionWithDefaults<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const BalloonToolbar: FC<BalloonToolbarProps> = ({
  useMdx,
  containerRef,
  collection,
  field,
  disabled,
}) => {
  const hasEditorFocus = useFocused();
  const editor = useMdPlateEditorState();
  const selection = usePlateSelection();
  const [hasFocus, setHasFocus] = useState(false);

  const isMediaLibraryOpen = useAppSelector(selectVisible);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  const anchorEl = useRef<HTMLDivElement | null>(null);

  const [selectionBoundingClientRect, setSelectionBoundingClientRect] =
    useState<ClientRectObject | null>(null);

  const rect = getSelectionBoundingClientRect();

  useEffect(() => {
    if (rect.x === 0 && rect.y === 0) {
      return;
    }

    setSelectionBoundingClientRect(rect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect.x, rect.y]);

  const [selectionExpanded, selectionText] = useMemo(() => {
    if (!editor) {
      return [undefined, undefined, undefined];
    }

    return [isSelectionExpanded(editor), getSelectionText(editor)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, selection]);

  const node = getNode(editor, editor.selection?.anchor.path ?? []);

  const isInTableCell = useMemo(() => {
    return Boolean(
      selection && someNode(editor, { match: { type: ELEMENT_TD }, at: selection?.anchor }),
    );
  }, [editor, selection]);

  const [groups, setGroups] = useState<ReactNode[]>([]);

  useEffect(() => {
    if (isMediaLibraryOpen) {
      return;
    }

    if (!hasEditorFocus && !hasFocus) {
      setGroups([]);
      return;
    }

    if (selection && someNode(editor, { match: { type: ELEMENT_LINK }, at: selection?.anchor })) {
      setGroups([]);
      return;
    }

    // Selected text buttons
    if (selectionText && selectionExpanded) {
      setGroups(
        getToolbarButtons(
          isInTableCell
            ? field.toolbar_buttons?.table_selection ?? DEFAULT_TABLE_SELECTION_BUTTONS
            : field.toolbar_buttons?.selection ?? DEFAULT_SELECTION_BUTTONS,
          collection,
          field,
          disabled,
        ),
      );
      return;
    }

    // Empty table cell
    if (
      node &&
      ((isElement(node) && isElementEmpty(editor, node)) || (isText(node) && isEmpty(node.text)))
    ) {
      setGroups(
        getToolbarButtons(
          isInTableCell
            ? field.toolbar_buttons?.table_empty ?? DEFAULT_TABLE_EMPTY_BUTTONS
            : field.toolbar_buttons?.empty ?? DEFAULT_EMPTY_BUTTONS,
          collection,
          field,
          disabled,
        ),
      );
      return;
    }

    setGroups([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasFocus,
    hasEditorFocus,
    selection,
    editor,
    selectionText,
    selectionExpanded,
    node,
    useMdx,
    isInTableCell,
    containerRef,
    collection,
    field,
    isMediaLibraryOpen,
  ]);

  const open = useMemo(
    () => Boolean(selectionBoundingClientRect && (groups.length > 0 || isMediaLibraryOpen)),
    [groups.length, isMediaLibraryOpen, selectionBoundingClientRect],
  );

  return (
    <>
      <div
        ref={anchorEl}
        className={classes.root}
        style={{
          top: `${selectionBoundingClientRect?.y ?? 0}px`,
          left: `${selectionBoundingClientRect?.x ?? 0}px`,
          width: 1,
          height: 1,
        }}
      />
      {selectionBoundingClientRect && open && anchorEl.current && groups.length > 0 ? (
        <Popper
          open
          placement="top"
          anchorEl={anchorEl.current ?? null}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          slots={{ root: 'div' }}
          className={classes.popper}
          keepMounted
        >
          <div data-testid="balloon-toolbar" className={classes.content}>
            {groups}
          </div>
        </Popper>
      ) : null}
    </>
  );
};

export default BalloonToolbar;
