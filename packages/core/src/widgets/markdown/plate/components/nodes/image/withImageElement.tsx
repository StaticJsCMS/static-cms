import {
  findNodePath,
  getNode,
  removeNodes,
  setNodes,
  setSelection,
  usePlateSelection,
} from '@udecode/plate';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocused } from 'slate-react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { MediaPopover } from '@staticcms/markdown';
import useDebounce from '@staticcms/core/lib/hooks/useDebounce';

import type { Collection, Entry, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { MdImageElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { TMediaElement } from '@udecode/plate-media';
import type { FC } from 'react';

export interface WithImageElementProps {
  collection: Collection<MarkdownField>;
  entry: Entry;
  field: MarkdownField;
}

const withImageElement = ({ collection, entry, field }: WithImageElementProps) => {
  const ImageElement: FC<PlateRenderElementProps<MdValue, MdImageElement>> = ({
    element,
    editor,
    children,
  }) => {
    const { url, alt } = element;
    const [internalValue, setInternalValue] = useState<MediaPath<string>>({ path: url, alt });
    const [popoverHasFocus, setPopoverHasFocus] = useState(false);
    const debouncedPopoverHasFocus = useDebounce(popoverHasFocus, 100);

    const [mediaOpen, setMediaOpen] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
    const hasEditorFocus = useFocused();
    const debouncedHasEditorFocus = useDebounce(hasEditorFocus, 100);

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

    const handleChange = useCallback(
      (value: string, key: string) => {
        const path = findNodePath(editor, element);
        path && setNodes<TMediaElement>(editor, { [key]: value }, { at: path });
      },
      [editor, element],
    );

    const handleOpenPopover = useCallback(() => {
      const path = findNodePath(editor, element);
      let selection = editor.prevSelection!;
      if (path) {
        const childPath = [...path, 0];
        selection = {
          anchor: {
            path: childPath,
            offset: 0,
          },
          focus: {
            path: childPath,
            offset: 0,
          },
        };
      }
      setSelection(editor, selection);
      setAnchorEl(imageRef.current);
    }, [editor, element]);

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const assetSource = useMediaAsset(url, collection, field, entry);

    const handleMediaChange = useCallback(
      (newValue: MediaPath<string>) => {
        handleChange(newValue.path, 'url');
        handleChange(newValue.alt ?? '', 'alt');
        setInternalValue(newValue);
      },
      [handleChange],
    );

    const handleRemove = useCallback(() => {
      const path = findNodePath(editor, element);
      removeNodes(editor, { at: path });
    }, [editor, element]);

    const selection = usePlateSelection();

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
        <img
          ref={imageRef}
          src={assetSource}
          alt={!isEmpty(alt) ? alt : undefined}
          draggable={false}
          onClick={handleOpenPopover}
        />
        <MediaPopover
          anchorEl={anchorEl}
          collection={collection}
          field={field}
          url={internalValue.path}
          text={internalValue.alt}
          onMediaChange={handleMediaChange}
          onRemove={handleRemove}
          forImage
          onFocus={handlePopoverFocus}
          onBlur={handlePopoverBlur}
          onMediaToggle={handleMediaToggle}
        />
        {children}
      </span>
    );
  };

  return ImageElement;
};

export default withImageElement;
