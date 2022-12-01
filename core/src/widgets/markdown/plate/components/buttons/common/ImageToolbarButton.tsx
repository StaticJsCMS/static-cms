import { insertImage } from '@udecode/plate';
import React, { useCallback } from 'react';

import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { useMdPlateEditorState } from '@staticcms/markdown';
import MediaToolbarButton from './MediaToolbarButton';

import type { FC } from 'react';
import type { MediaToolbarButtonProps } from './MediaToolbarButton';

const ImageToolbarButton: FC<Omit<MediaToolbarButtonProps, 'onChange'>> = props => {
  const editor = useMdPlateEditorState();
  const handleInsert = useCallback(
    (newUrl: string) => {
      if (isNotEmpty(newUrl)) {
        insertImage(editor, newUrl);
      }
    },
    [editor],
  );

  return <MediaToolbarButton {...props} onChange={handleInsert} inserting forImage />;
};

export default ImageToolbarButton;
