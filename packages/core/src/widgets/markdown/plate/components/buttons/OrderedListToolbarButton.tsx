import { FormatListNumbered as FormatListNumberedIcon } from '@styled-icons/material/FormatListNumbered';
import { ELEMENT_OL } from '@udecode/plate';
import React from 'react';

import ListToolbarButton from './common/ListToolbarButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface OrderedListToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const OrderedListToolbarButton: FC<TranslatedProps<OrderedListToolbarButtonProps>> = ({
  disabled,
  variant,
  t,
}) => {
  return (
    <ListToolbarButton
      tooltip={t('editor.editorWidgets.markdown.numberedList')}
      type={ELEMENT_OL}
      icon={FormatListNumberedIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default OrderedListToolbarButton;
