import {
  findNodePath,
  focusEditor,
  getEditorString,
  setNodes,
  unwrapLink,
  upsertLink,
} from '@udecode/plate';
import React, { useCallback, useMemo, useState } from 'react';

import MediaPopover from '../common/MediaPopover';

import type { MdLinkElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC, MouseEvent } from 'react';
import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';

export interface WithLinkElementProps {
  containerRef: HTMLElement | null;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  entry: Entry;
}

const withLinkElement = ({ containerRef, collection, field, entry }: WithLinkElementProps) => {
  const LinkElement: FC<PlateRenderElementProps<MdValue, MdLinkElement>> = ({
    attributes,
    children,
    nodeProps,
    element,
    editor,
  }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

    const { url } = element;
    const path = useMemo(() => findNodePath(editor, element), [editor, element]);

    const [internalUrl, setInternalUrl] = useState(url);
    const [internalText, setInternalText] = useState(getEditorString(editor, path));

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

    const handleChange = useCallback(
      (newUrl: string, newText: string) => {
        path && setNodes<MdLinkElement>(editor, { url: newUrl }, { at: path });
        upsertLink(editor, { url: newUrl, text: newText });
      },
      [editor, path],
    );

    const handleMediaChange = useCallback(
      (newValue: string) => {
        handleChange(newValue, internalText);
        setInternalUrl(newValue);
      },
      [handleChange, internalText],
    );

    const handleClose = useCallback(() => {
      setAnchorEl(null);
      handleChange(internalUrl, internalText);
    }, [handleChange, internalText, internalUrl]);

    return (
      <>
        <a {...attributes} href={url} {...nodeProps} onClick={handleClick}>
          {children}
        </a>
        <MediaPopover
          anchorEl={anchorEl}
          containerRef={containerRef}
          collection={collection}
          field={field}
          entry={entry}
          url={internalUrl}
          text={internalText}
          onUrlChange={setInternalUrl}
          onTextChange={setInternalText}
          onClose={handleClose}
          onMediaChange={handleMediaChange}
          onRemove={handleRemove}
        />
      </>
    );
  };

  return LinkElement;
};

export default withLinkElement;
