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

import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';
import type { MdImageElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { TMediaElement } from '@udecode/plate-media';
import type { FC } from 'react';

export interface WithImageElementProps {
  containerRef: HTMLElement | null;
  collection: Collection<MarkdownField>;
  entry: Entry;
  field: MarkdownField;
}

const withImageElement = ({ containerRef, collection, entry, field }: WithImageElementProps) => {
  const ImageElement: FC<PlateRenderElementProps<MdValue, MdImageElement>> = ({
    element,
    editor,
    children,
  }) => {
    const { url, alt } = element;
    const [internalUrl, setInternalUrl] = useState(url);
    const [internalAlt, setInternalAlt] = useState(alt);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
    const hasEditorFocus = useFocused();

    const handleBlur = useCallback(() => {
      setAnchorEl(null);
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
      handleChange(internalUrl, 'url');
      handleChange(internalAlt ?? '', 'alt');
    }, [handleChange, internalAlt, internalUrl]);

    const assetSource = useMediaAsset(url, collection, field, entry);

    const handleMediaChange = useCallback(
      (newValue: string) => {
        handleChange(newValue, 'url');
        setInternalUrl(newValue);
      },
      [handleChange],
    );

    const handleRemove = useCallback(() => {
      const path = findNodePath(editor, element);
      removeNodes(editor, { at: path });
    }, [editor, element]);

    const selection = usePlateSelection();

    useEffect(() => {
      if (!hasEditorFocus || !selection) {
        return;
      }

      const node = getNode(editor, selection.anchor.path);
      const firstChild =
        'children' in element && element.children.length > 0 ? element.children[0] : undefined;

      if (!node) {
        return;
      }

      if (node !== element && node !== firstChild) {
        handleClose();
        return;
      }

      handleOpenPopover();
    }, [handleClose, hasEditorFocus, element, selection, editor, handleOpenPopover]);

    return (
      <div onBlur={handleBlur}>
        <img
          ref={imageRef}
          src={assetSource}
          alt={!isEmpty(alt) ? alt : undefined}
          draggable={false}
          onClick={handleOpenPopover}
        />
        <MediaPopover
          anchorEl={anchorEl}
          containerRef={containerRef}
          collection={collection}
          field={field}
          entry={entry}
          url={internalUrl}
          text={internalAlt ?? ''}
          textLabel="Alt"
          onUrlChange={setInternalUrl}
          onTextChange={setInternalAlt}
          onClose={handleClose}
          onMediaChange={handleMediaChange}
          onRemove={handleRemove}
          forImage
        />
        {children}
      </div>
    );
  };

  return ImageElement;
};

export default withImageElement;
