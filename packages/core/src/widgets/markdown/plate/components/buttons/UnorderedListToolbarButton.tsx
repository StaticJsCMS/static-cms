import { FormatListBulleted as FormatListBulletedIcon } from '@styled-icons/material/FormatListBulleted';
import { ELEMENT_UL } from '@udecode/plate';
import React from 'react';

import ListToolbarButton from './common/ListToolbarButton';
import { useTranslate } from '@staticcms/core/lib';

import type { FC } from 'react';

export interface UnorderedListToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const UnorderedListToolbarButton: FC<UnorderedListToolbarButtonProps> = ({ disabled, variant }) => {
  const t = useTranslate();

  return (
    <ListToolbarButton
      id="bulleted-list"
      tooltip={t('editor.editorWidgets.markdown.bulletedList')}
      type={ELEMENT_UL}
      icon={FormatListBulletedIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default UnorderedListToolbarButton;
