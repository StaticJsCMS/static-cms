import { getListItemEntry, toggleList } from '@udecode/plate-list';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './ToolbarButton';

import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface ListToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
  type: string;
  variant: 'button' | 'menu';
}

const ListToolbarButton: FC<ListToolbarButtonProps> = ({ type, icon, ...props }) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(() => {
    toggleList(editor, {
      type,
    });
  }, [editor, type]);

  const res = !!editor?.selection && getListItemEntry(editor);

  return (
    <ToolbarButton
      active={!!res && res.list[0].type === type}
      onClick={handleOnClick}
      icon={icon}
      {...props}
    />
  );
};

export default ListToolbarButton;
