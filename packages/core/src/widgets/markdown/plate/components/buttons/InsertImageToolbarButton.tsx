import { Image as ImageIcon } from '@styled-icons/material/Image';
import { insertImage } from '@udecode/plate';
import React, { useCallback, useMemo } from 'react';

import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { Collection, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface InsertImageToolbarButtonProps {
  variant: 'button' | 'menu';
  currentValue?: { url: string; alt?: string };
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const InsertImageToolbarButton: FC<InsertImageToolbarButtonProps> = ({
  variant,
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

  const chooseUrl = useMemo(() => field.choose_url ?? true, [field.choose_url]);

  const openMediaLibrary = useMediaInsert(
    {
      path: currentValue?.url ?? '',
      alt: currentValue?.alt,
    },
    { collection, field, forImage: true, insertOptions: { chooseUrl, showAlt: true } },
    handleInsert,
  );

  return (
    <ToolbarButton
      label="Image"
      tooltip="Insert image"
      icon={ImageIcon}
      onClick={openMediaLibrary}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertImageToolbarButton;
