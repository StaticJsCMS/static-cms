import {
  findNodePath,
  focusEditor,
  getEditorString,
  getNode,
  replaceNodeChildren,
  setNodes,
  unwrapLink,
  usePlateSelection,
} from '@udecode/plate';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocused } from 'slate-react';

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import MediaPopover from '../../common/MediaPopover';

import type { Collection, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { MdLinkElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps, TText } from '@udecode/plate';
import type { FC, MouseEvent } from 'react';

export interface WithLinkElementProps {
  collection: Collection<MarkdownField>;
  field: MarkdownField;
}

const withLinkElement = ({ collection, field }: WithLinkElementProps) => {
  const LinkElement: FC<PlateRenderElementProps<MdValue, MdLinkElement>> = ({
    attributes: { ref: _ref, ...attributes },
    children,
    nodeProps,
    element,
    editor,
  }) => {
    const urlRef = useRef<HTMLAnchorElement | null>(null);

    const { url } = element;
    const path = findNodePath(editor, element);

    const [internalValue, setInternalValue] = useState<MediaPath<string>>({
      path: url,
      alt: getEditorString(editor, path),
    });
    const [popoverHasFocus, setPopoverHasFocus] = useState(false);
    const debouncedPopoverHasFocus = useDebounce(popoverHasFocus, 100);

    const [mediaOpen, setMediaOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
    const hasEditorFocus = useFocused();
    const debouncedHasEditorFocus = useDebounce(hasEditorFocus, 100);

    const handleOpenPopover = useCallback(() => {
      setAnchorEl(urlRef.current);
    }, []);

    const handleBlur = useCallback(() => {
      if (!popoverHasFocus && !mediaOpen) {
        setAnchorEl(null);
      }
    }, [mediaOpen, popoverHasFocus]);

    const handlePopoverFocus = useCallback(() => {
      setPopoverHasFocus(true);
    }, []);

    const handlePopoverBlur = useCallback(() => {
      setPopoverHasFocus(false);
    }, []);

    const handleMediaToggle = useCallback(() => {
      setMediaOpen(oldMediaOpen => !oldMediaOpen);
    }, []);

    const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
      setAnchorEl(event.currentTarget);
    }, []);

    const handleRemove = useCallback(() => {
      if (!editor.selection) {
        return;
      }
      unwrapLink(editor);
      focusEditor(editor, editor.selection);
    }, [editor]);

    const selection = usePlateSelection();

    const handleChange = useCallback(
      (newUrl: string, newText: string) => {
        const path = findNodePath(editor, element);

        if (path) {
          setNodes(
            editor,
            { ...element, url: newUrl, children: [{ text: newText }] },
            { at: path },
          );

          if (newText?.length && newText !== getEditorString(editor, path)) {
            replaceNodeChildren<TText>(editor, {
              at: path,
              nodes: { text: newText },
              insertOptions: {
                select: true,
              },
            });
          }
        }
      },
      [editor, element],
    );

    const handleMediaChange = useCallback(
      (newValue: MediaPath<string>) => {
        handleChange(newValue.path, newValue.alt ?? '');
        setInternalValue(newValue);
      },
      [handleChange],
    );

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    useEffect(() => {
      if (
        hasEditorFocus ||
        debouncedHasEditorFocus ||
        mediaOpen ||
        popoverHasFocus ||
        debouncedPopoverHasFocus
      ) {
        return;
      }

      handleClose();
    }, [
      debouncedHasEditorFocus,
      debouncedPopoverHasFocus,
      handleClose,
      hasEditorFocus,
      mediaOpen,
      popoverHasFocus,
    ]);
    useEffect(() => {
      if (
        hasEditorFocus ||
        debouncedHasEditorFocus ||
        mediaOpen ||
        popoverHasFocus ||
        debouncedPopoverHasFocus
      ) {
        return;
      }

      handleClose();
    }, [
      debouncedHasEditorFocus,
      debouncedPopoverHasFocus,
      handleClose,
      hasEditorFocus,
      mediaOpen,
      popoverHasFocus,
    ]);

    useEffect(() => {
      if (!hasEditorFocus || !selection || mediaOpen || popoverHasFocus) {
        return;
      }

      const node = getNode(editor, selection.anchor.path);
      const firstChild =
        'children' in element && element.children.length > 0 ? element.children[0] : undefined;

      if (!node) {
        return;
      }

      if (node !== element && node !== firstChild) {
        if (anchorEl) {
          handleClose();
        }
        return;
      }

      handleOpenPopover();
    }, [
      handleClose,
      hasEditorFocus,
      element,
      selection,
      editor,
      handleOpenPopover,
      mediaOpen,
      popoverHasFocus,
      anchorEl,
    ]);

    return (
      <span onBlur={handleBlur}>
        <a
          ref={urlRef}
          {...attributes}
          href={url}
          {...nodeProps}
          onClick={handleClick}
          className="
            text-blue-500
            cursor-pointer
            hover:underline
          "
        >
          {children}
        </a>
        <MediaPopover
          anchorEl={anchorEl}
          collection={collection}
          field={field}
          url={internalValue.path}
          text={internalValue.alt}
          onMediaChange={handleMediaChange}
          onRemove={handleRemove}
          onFocus={handlePopoverFocus}
          onBlur={handlePopoverBlur}
          onMediaToggle={handleMediaToggle}
        />
      </span>
    );
  };

  return LinkElement;
};

export default withLinkElement;
