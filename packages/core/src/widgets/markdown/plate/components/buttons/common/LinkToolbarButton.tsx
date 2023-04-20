import { Link as LinkIcon } from '@styled-icons/material/Link';
import { ELEMENT_LINK, insertLink, someNode } from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './ToolbarButton';

import type { Collection, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { FC } from 'react';

interface LinkToolbarButtonProps {
  variant?: 'button' | 'menu';
  currentValue?: { url: string; alt?: string };
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const LinkToolbarButton: FC<LinkToolbarButtonProps> = ({
  variant = 'button',
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

  const isLink = !!editor?.selection && someNode(editor, { match: { type: ELEMENT_LINK } });

  const controlID = useUUID();
  const openMediaLibrary = useMediaInsert(
    {
      path: currentValue?.url ?? '',
      alt: currentValue?.alt,
    },
    { collection, field, controlID, forImage: true },
    handleInsert,
  );

  if (variant === 'menu') {
    return (
      <MenuItemButton key={ELEMENT_LINK} onClick={openMediaLibrary} startIcon={LinkIcon}>
        File / Link
      </MenuItemButton>
    );
  }

  return (
    <ToolbarButton
      key="insertLink"
      tooltip="Insert Link"
      icon={<LinkIcon className="w-5 h-5" />}
      onClick={(_editor, event) => openMediaLibrary(event)}
      active={isLink}
      disabled={disabled}
    />
  );
};

export default LinkToolbarButton;
