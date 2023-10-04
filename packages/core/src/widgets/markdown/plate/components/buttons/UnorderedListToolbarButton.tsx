import { FormatListBulleted as FormatListBulletedIcon } from '@styled-icons/material/FormatListBulleted';
import { ELEMENT_UL } from '@udecode/plate';
import React from 'react';

import ListToolbarButton from './common/ListToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface UnorderedListToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const UnorderedListToolbarButton: FC<TranslatedProps<UnorderedListToolbarButtonProps>> = ({ disabled, variant, t }) => {
  return (
    <ListToolbarButton
      tooltip={t('editor.editorWidgets.markdown.bulletedList')}
      type={ELEMENT_UL}
      icon={FormatListBulletedIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default UnorderedListToolbarButton;
