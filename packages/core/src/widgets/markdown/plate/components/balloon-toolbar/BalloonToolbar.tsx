import PopperUnstyled from '@mui/base/PopperUnstyled';
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

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { selectVisible } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import { getToolbarButtons } from '../../hooks/useToolbarButtons';
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

import type {
  Collection,
  MarkdownField,
  MarkdownToolbarButtonType,
} from '@staticcms/core/interface';
import type { ClientRectObject } from '@udecode/plate';
import type { FC, ReactNode } from 'react';

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
  collection: Collection<MarkdownField>;
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
  const debouncedHasFocus = useDebounce(hasFocus, 150);

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

  const [selectionExpanded, selectionText] = useMemo(() => {
    if (!editor) {
      return [undefined, undefined, undefined];
    }

    return [isSelectionExpanded(editor), getSelectionText(editor)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, selection]);

  const node = getNode(editor, editor.selection?.anchor.path ?? []);

  useEffect(() => {
    if (!editor || !hasEditorFocus) {
      return;
    }

    setTimeout(() => {
      setSelectionBoundingClientRect(getSelectionBoundingClientRect());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, debouncedHasFocus]);

  const isInTableCell = useMemo(() => {
    return Boolean(
      selection && someNode(editor, { match: { type: ELEMENT_TD }, at: selection?.anchor }),
    );
  }, [editor, selection]);

  const debouncedEditorFocus = useDebounce(hasEditorFocus, 150);

  const [groups, setGroups] = useState<ReactNode[]>([]);

  useEffect(() => {
    if (isMediaLibraryOpen) {
      return;
    }

    if (!debouncedEditorFocus && !hasFocus && !debouncedHasFocus) {
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
    debouncedEditorFocus,
    hasFocus,
    debouncedHasFocus,
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

  const [prevSelectionBoundingClientRect, setPrevSelectionBoundingClientRect] = useState(
    selectionBoundingClientRect,
  );

  const debouncedGroups = useDebounce(
    groups,
    prevSelectionBoundingClientRect !== selectionBoundingClientRect ? 0 : 150,
  );
  const open = useMemo(
    () => groups.length > 0 || debouncedGroups.length > 0 || isMediaLibraryOpen,
    [debouncedGroups.length, groups.length, isMediaLibraryOpen],
  );
  const debouncedOpen = useDebounce(
    open,
    prevSelectionBoundingClientRect !== selectionBoundingClientRect ? 0 : 50,
  );

  useEffect(() => {
    setPrevSelectionBoundingClientRect(selectionBoundingClientRect);
  }, [selectionBoundingClientRect]);

  return (
    <>
      <div
        ref={anchorEl}
        className="fixed"
        style={{
          top: `${selectionBoundingClientRect?.y ?? 0}px`,
          left: `${selectionBoundingClientRect?.x}px`,
        }}
      />
      <PopperUnstyled
        open={Boolean(debouncedOpen && anchorEl.current)}
        component="div"
        placement="top"
        anchorEl={anchorEl.current ?? null}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        className="
          absolute
          max-h-60
          overflow-auto
          rounded-md
          bg-white
          p-1
          text-base
          shadow-lg
          ring-1
          ring-black
          ring-opacity-5
          focus:outline-none
          sm:text-sm
          z-40
          dark:bg-slate-700
        "
      >
        <div
          data-testid="balloon-toolbar"
          className="
            flex
            gap-0.5
          "
        >
          {groups.length > 0 ? groups : debouncedGroups}
        </div>
      </PopperUnstyled>
    </>
  );
};

export default BalloonToolbar;
