import { Link as LinkIcon } from '@styled-icons/material/Link';
import {
  ELEMENT_LINK,
  focusEditor,
  getSelectionText,
  insertLink,
  replaceNodeChildren,
  setNodes,
  someNode,
  upsertLink,
} from '@udecode/plate';
import React, { useCallback, useMemo, useState } from 'react';

import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { isEmpty, isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { Collection, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { BaseSelection } from 'slate';

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
  const [selection, setSelection] = useState<BaseSelection>();
  const editor = useMdPlateEditorState();
  const handleInsert = useCallback(
    ({ path: newUrl, alt: newText }: MediaPath<string>) => {
      if (isNotEmpty(newUrl) && selection) {
        focusEditor(editor, selection);

        upsertLink(editor, {
          url: newUrl,
          text: newText ?? newUrl,
          insertNodesOptions: { at: selection },
        });
      }
    },
    [editor, selection],
  );

  const chooseUrl = useMemo(() => field.choose_url ?? true, [field.choose_url]);

  const isLink = !!editor?.selection && someNode(editor, { match: { type: ELEMENT_LINK } });

  const selectedText: string = useMemo(() => {
    if (!editor.selection) {
      return '';
    }

    return getSelectionText(editor);
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

  const handleOpenMediaLibrary = useCallback(() => {
    setSelection(editor.selection);
    openMediaLibrary();
  }, [editor.selection, openMediaLibrary]);

  return (
    <ToolbarButton
      label="Link"
      tooltip="Insert link"
      icon={LinkIcon}
      onClick={handleOpenMediaLibrary}
      active={isLink}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default InsertLinkToolbarButton;
