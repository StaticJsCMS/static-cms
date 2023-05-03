import { Link as LinkIcon } from '@styled-icons/material/Link';
import { ELEMENT_LINK, getNode, insertLink, someNode } from '@udecode/plate';
import React, { useCallback, useMemo } from 'react';

import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { Collection, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface InsertLinkToolbarButtonProps {
  variant: 'button' | 'menu';
  currentValue?: { url: string; alt?: string };
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const InsertLinkToolbarButton: FC<InsertLinkToolbarButtonProps> = ({
  variant,
  field,
  collection,
  currentValue,
  disabled,
}) => {
  const editor = useMdPlateEditorState();
  const handleInsert = useCallback(
    ({ path: newUrl, alt: newText }: MediaPath<string>) => {
      if (isNotEmpty(newUrl)) {
        insertLink(
          editor,
          { url: newUrl, text: isNotEmpty(newText) ? newText : newUrl },
          { at: editor.selection ?? editor.prevSelection! },
        );
      }
    },
    [editor],
  );

  const chooseUrl = useMemo(() => field.choose_url ?? true, [field.choose_url]);

  const isLink = !!editor?.selection && someNode(editor, { match: { type: ELEMENT_LINK } });

  const selectedText: string = useMemo(() => {
    if (!editor.selection) {
      return '';
    }

    const node = getNode(editor, editor.selection.anchor.path);

    return node && 'text' in node ? (node.text as string) : '';
  }, [editor]);

  const controlID = useUUID();
  const openMediaLibrary = useMediaInsert(
    {
      path: currentValue?.url ?? '',
      alt: currentValue?.alt ?? selectedText,
    },
    { collection, field, controlID, forImage: false, insertOptions: { chooseUrl, showAlt: true } },
    handleInsert,
  );

  return (
    <ToolbarButton
      label="Link"
      tooltip="Insert link"
      icon={LinkIcon}
      onClick={openMediaLibrary}
      active={isLink}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertLinkToolbarButton;
