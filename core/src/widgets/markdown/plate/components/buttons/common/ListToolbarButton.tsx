import { getListItemEntry, toggleList } from '@udecode/plate-list';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown';
import ToolbarButton from './ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface ListToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
  type: string;
}

const ListToolbarButton: FC<ListToolbarButtonProps> = ({ type, ...props }) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(
    (editor: MdEditor) => {
      toggleList(editor, {
        type,
      });
    },
    [type],
  );

  const res = !!editor?.selection && getListItemEntry(editor);

  return (
    <ToolbarButton active={!!res && res.list[0].type === type} onClick={handleOnClick} {...props} />
  );
};

export default ListToolbarButton;
