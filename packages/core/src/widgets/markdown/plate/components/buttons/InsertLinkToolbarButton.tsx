import { Link as LinkIcon } from '@styled-icons/material/Link';
import {
  ELEMENT_LINK,
  getEditorString,
  getNode,
  getSelectionText,
  insertLink,
  replaceNodeChildren,
  setNodes,
  someNode,
} from '@udecode/plate';
import React, { useCallback, useMemo, useState } from 'react';

import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { Collection, MarkdownField, MediaPath } from '@staticcms/core/interface';
import type { MdLinkElement } from '@staticcms/markdown/plate/plateTypes';
import type { TText } from '@udecode/plate';
import type { FC } from 'react';
import type { Path } from 'slate';

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
  const [selection, setSelection] = useState<Path>();
  const editor = useMdPlateEditorState();
  const handleInsert = useCallback(
    ({ path: newUrl, alt: newText }: MediaPath<string>) => {
      if (isNotEmpty(newUrl) && selection) {
        const text = isNotEmpty(newText) ? newText : newUrl;
        const linkAt = getNode<MdLinkElement>(editor, selection);

        if (linkAt && linkAt.type === ELEMENT_LINK) {
          if (newUrl !== linkAt.url || text !== linkAt.children[0].text) {
            setNodes<MdLinkElement>(
              editor,
              { url: newUrl, children: [{ text: newText }] },
              { at: selection },
            );

            if (text !== getEditorString(editor, selection)) {
              replaceNodeChildren<TText>(editor, {
                at: selection,
                nodes: { text },
                insertOptions: {
                  select: true,
                },
              });
            }
          }

          return;
        }

        insertLink(
          editor,
          { url: newUrl, text },
          {
            at: selection,
          },
        );
        const newSelection = [...selection];
        const lastIndex = newSelection.pop() ?? 0;
        setSelection([...newSelection, lastIndex + 1]);
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
    setSelection(editor.selection?.focus.path);
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
