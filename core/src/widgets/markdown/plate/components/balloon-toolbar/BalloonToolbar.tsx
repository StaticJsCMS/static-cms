import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import {
  ELEMENT_LINK,
  ELEMENT_TD,
  findNodePath,
  getNode,
  getParentNode,
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

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState, VOID_ELEMENTS } from '@staticcms/markdown';
import BasicElementToolbarButtons from '../buttons/BasicElementToolbarButtons';
import BasicMarkToolbarButtons from '../buttons/BasicMarkToolbarButtons';
import MediaToolbarButtons from '../buttons/MediaToolbarButtons';
import TableToolbarButtons from '../buttons/TableToolbarButtons';

import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';
import type { ClientRectObject } from '@udecode/plate';
import type { FC, ReactNode } from 'react';

const StyledPopperContent = styled('div')(
  ({ theme }) => `
    display: flex;
    gap: 4px;
    background: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[8]};
    margin-bottom: 10px;
    padding: 6px;
    border-radius: 4px;
    align-items: center;
  `,
);

const StyledDivider = styled('div')(
  ({ theme }) => `
    height: 18px;
    width: 1px;
    background: ${theme.palette.text.secondary};
    margin: 0 4px;
    opacity: 0.5;
  `,
);

export interface BalloonToolbarProps {
  containerRef: HTMLElement | null;
  hasEditorFocus: boolean;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  entry: Entry;
}

const BalloonToolbar: FC<BalloonToolbarProps> = ({
  containerRef,
  hasEditorFocus,
  collection,
  field,
  entry,
}) => {
  const editor = useMdPlateEditorState();
  const selection = usePlateSelection();
  const [hasFocus, setHasFocus] = useState(false);
  const debouncedHasFocus = useDebounce(hasFocus, 150);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  const anchorEl = useRef<HTMLDivElement>();
  const [selectionBoundingClientRect, setSelectionBoundingClientRect] =
    useState<ClientRectObject | null>(null);

  const [mediaOpen, setMediaOpen] = useState(false);

  const [selectionExpanded, selectionText] = useMemo(() => {
    if (!editor) {
      return [undefined, undefined, undefined];
    }

    return [isSelectionExpanded(editor), getSelectionText(editor)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, selection]);

  const node = getNode(editor, editor.selection?.anchor.path ?? []);

  useEffect(() => {
    if (!editor) {
      return undefined;
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

  const groups: ReactNode[] = useMemo(() => {
    if (!mediaOpen && !debouncedEditorFocus && !hasFocus && !debouncedHasFocus) {
      return [];
    }

    if (selection && someNode(editor, { match: { type: ELEMENT_LINK }, at: selection?.anchor })) {
      return [];
    }

    if (selectionText && selectionExpanded) {
      return [
        <BasicMarkToolbarButtons key="selection-basic-mark-buttons" />,
        <BasicElementToolbarButtons
          key="selection-basic-element-buttons"
          hideFontTypeSelect={isInTableCell}
          hideCodeBlock
        />,
        isInTableCell && <TableToolbarButtons key="selection-table-toolbar-buttons" />,
        <MediaToolbarButtons
          key="selection-media-buttons"
          containerRef={containerRef}
          collection={collection}
          field={field}
          entry={entry}
          onMediaToggle={setMediaOpen}
          hideUploads
        />,
      ].filter(Boolean);
    }

    if (
      editor.children.length > 1 &&
      node &&
      ((isElement(node) && isElementEmpty(editor, node)) || (isText(node) && isEmpty(node.text)))
    ) {
      const path = findNodePath(editor, node) ?? [];
      const parent = getParentNode(editor, path);
      if (
        path.length > 0 &&
        path[0] !== 0 &&
        parent &&
        parent.length > 0 &&
        'children' in parent[0] &&
        !VOID_ELEMENTS.includes(parent[0].type as string) &&
        parent[0].children.length === 1
      ) {
        return [
          <BasicMarkToolbarButtons key="empty-basic-mark-buttons" />,
          <BasicElementToolbarButtons
            key="empty-basic-element-buttons"
            hideFontTypeSelect={isInTableCell}
            hideCodeBlock
          />,
          <TableToolbarButtons key="empty-table-toolbar-buttons" isInTable={isInTableCell} />,
          <MediaToolbarButtons
            key="empty-media-buttons"
            containerRef={containerRef}
            collection={collection}
            field={field}
            entry={entry}
            onMediaToggle={setMediaOpen}
          />,
        ];
      }
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collection,
    editor,
    field,
    hasFocus,
    debouncedHasFocus,
    debouncedEditorFocus,
    isInTableCell,
    mediaOpen,
    node,
    selection,
    selectionExpanded,
    selectionText,
  ]);

  const [prevSelectionBoundingClientRect, setPrevSelectionBoundingClientRect] = useState(
    selectionBoundingClientRect,
  );

  const debouncedGroups = useDebounce(
    groups,
    prevSelectionBoundingClientRect !== selectionBoundingClientRect ? 0 : 150,
  );
  const open = useMemo(
    () => groups.length > 0 || debouncedGroups.length > 0,
    [debouncedGroups.length, groups.length],
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
      <Box
        ref={anchorEl}
        sx={{
          position: 'fixed',
          top: selectionBoundingClientRect?.y,
          left: selectionBoundingClientRect?.x,
        }}
      />
      <Popper
        open={debouncedOpen}
        placement="top"
        anchorEl={anchorEl.current ?? null}
        sx={{ zIndex: 100 }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disablePortal
        tabIndex={0}
      >
        <StyledPopperContent>
          {(groups.length > 0 ? groups : debouncedGroups).map((group, index) => [
            index !== 0 ? <StyledDivider key={`table-divider-${index}`} /> : null,
            group,
          ])}
        </StyledPopperContent>
      </Popper>
    </>
  );
};

export default BalloonToolbar;
