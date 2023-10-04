import { Link as LinkIcon } from '@styled-icons/material/Link';
import {
  ELEMENT_LINK,
  deleteText,
  getEditorString,
  getNode,
  getSelectionText,
  insertLink,
  replaceNodeChildren,
  setNodes,
  someNode,
} from '@udecode/plate';
import React, { useCallback, useMemo } from 'react';

import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type {
  Collection,
  MarkdownField,
  MediaPath,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { MdLinkElement } from '@staticcms/markdown/plate/plateTypes';
import type { TText } from '@udecode/plate';
import type { FC } from 'react';
import type { Location } from 'slate';

export interface InsertLinkToolbarButtonProps {
  variant: 'button' | 'menu';
  currentValue?: { url: string; alt?: string };
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const InsertLinkToolbarButton: FC<TranslatedProps<InsertLinkToolbarButtonProps>> = ({
  variant,
  field,
  collection,
  currentValue,
  disabled,
  t,
}) => {
  const editor = useMdPlateEditorState();
  const handleInsert = useCallback(
    ({ path: newUrl, alt: newText }: MediaPath<string>) => {
      const selectionPoint = editor.selection?.focus.path;
      if (isNotEmpty(newUrl) && selectionPoint) {
        const text = isNotEmpty(newText) ? newText : newUrl;
        const linkAt = getNode<MdLinkElement>(editor, selectionPoint);

        if (linkAt && linkAt.type === ELEMENT_LINK) {
          if (newUrl !== linkAt.url || text !== linkAt.children[0].text) {
            setNodes<MdLinkElement>(
              editor,
              { url: newUrl, children: [{ text: newText }] },
              { at: selectionPoint },
            );

            if (text !== getEditorString(editor, selectionPoint)) {
              replaceNodeChildren<TText>(editor, {
                at: selectionPoint,
                nodes: { text },
                insertOptions: {
                  select: true,
                },
              });
            }
          }

          return;
        }

        deleteText(editor, {
          at: editor.selection as unknown as Location,
        });

        insertLink(
          editor,
          { url: newUrl, text },
          {
            at: editor.selection as unknown as Location,
          },
        );
      }
    },
    [editor],
  );

  const chooseUrl = useMemo(() => field.choose_url ?? true, [field.choose_url]);

  const isLink = !!editor?.selection && someNode(editor, { match: { type: ELEMENT_LINK } });

  const selectedText = !editor.selection ? '' : getSelectionText(editor);

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
    openMediaLibrary();
  }, [openMediaLibrary]);

  return !isLink ? (
    <ToolbarButton
      label={t('editor.editorWidgets.markdown.link')}
      tooltip={t('editor.editorWidgets.markdown.insertLink')}
      icon={LinkIcon}
      onClick={handleOpenMediaLibrary}
      disabled={disabled}
      variant={variant}
    />
  ) : null;
};

export default InsertLinkToolbarButton;
