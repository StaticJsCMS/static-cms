import { Image as ImageIcon } from '@styled-icons/material/Image';
import { ELEMENT_IMAGE, insertImage } from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './ToolbarButton';

import type { Collection, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { FC } from 'react';

interface ImageToolbarButtonProps {
  variant?: 'button' | 'menu';
  currentValue?: { url: string; alt?: string };
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const ImageToolbarButton: FC<ImageToolbarButtonProps> = ({
  variant = 'button',
  field,
  collection,
  currentValue,
  disabled,
}) => {
  const editor = useMdPlateEditorState();
  const handleInsert = useCallback(
    (newUrl: MediaPath<string>) => {
      if (isNotEmpty(newUrl.path)) {
        insertImage(editor, newUrl.path);
      }
    },
    [editor],
  );

  const openMediaLibrary = useMediaInsert(
    {
      path: currentValue?.url ?? '',
      alt: currentValue?.alt,
    },
    { collection, field, forImage: true },
    handleInsert,
  );

  if (variant === 'menu') {
    return (
      <MenuItemButton key={ELEMENT_IMAGE} onClick={openMediaLibrary} startIcon={ImageIcon}>
        Image
      </MenuItemButton>
    );
  }

  return (
    <ToolbarButton
      key="insertImage"
      tooltip="Insert Image"
      icon={<ImageIcon className="w-5 h-5" />}
      onClick={(_editor, event) => openMediaLibrary(event)}
      disabled={disabled}
    />
  );
};

export default ImageToolbarButton;
