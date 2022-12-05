import { ELEMENT_LINK, insertLink, someNode } from '@udecode/plate';
import React, { useCallback } from 'react';

import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown';
import MediaToolbarButton from './MediaToolbarButton';

import type { FC } from 'react';
import type { MediaToolbarButtonProps } from './MediaToolbarButton';

const LinkToolbarButton: FC<Omit<MediaToolbarButtonProps, 'onChange'>> = props => {
  const editor = useMdPlateEditorState();
  const handleInsert = useCallback(
    (newUrl: string, newText: string | undefined) => {
      if (isNotEmpty(newUrl) && isNotEmpty(newText)) {
        insertLink(
          editor,
          { url: newUrl, text: newText },
          { at: editor.selection ?? editor.prevSelection! },
        );
      }
    },
    [editor],
  );

  const isLink = !!editor?.selection && someNode(editor, { match: { type: ELEMENT_LINK } });

  return <MediaToolbarButton {...props} active={isLink} onChange={handleInsert} inserting />;
};

export default LinkToolbarButton;
