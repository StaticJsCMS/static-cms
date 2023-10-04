import React from 'react';

import {
  BLOCKQUOTE_TOOLBAR_BUTTON,
  BOLD_TOOLBAR_BUTTON,
  CODE_BLOCK_TOOLBAR_BUTTON,
  CODE_TOOLBAR_BUTTON,
  DECREASE_IDENT_TOOLBAR_BUTTON,
  FILE_LINK_TOOLBAR_BUTTON,
  FONT_TOOLBAR_BUTTON,
  IMAGE_TOOLBAR_BUTTON,
  INCRASE_IDENT_TOOLBAR_BUTTON,
  INSERT_TABLE_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  ORDERED_LIST_TOOLBAR_BUTTON,
  SHORTCODE_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  UNORDERED_LIST_TOOLBAR_BUTTON,
} from '@staticcms/core/constants/toolbar_buttons';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import useToolbarButtons from '../../hooks/useToolbarButtons';

import type { Collection, MarkdownField, MarkdownToolbarItem } from '@staticcms/core/interface';
import type { FC } from 'react';

import './Toolbar.css';

const classes = generateClassNames('WidgetMarkdown_Toolbar', ['root']);

const DEFAULT_TOOLBAR_BUTTONS: MarkdownToolbarItem[] = [
  BOLD_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  CODE_TOOLBAR_BUTTON,
  FONT_TOOLBAR_BUTTON,
  UNORDERED_LIST_TOOLBAR_BUTTON,
  ORDERED_LIST_TOOLBAR_BUTTON,
  DECREASE_IDENT_TOOLBAR_BUTTON,
  INCRASE_IDENT_TOOLBAR_BUTTON,
  SHORTCODE_TOOLBAR_BUTTON,
  {
    label: 'Insert',
    groups: [
      {
        items: [BLOCKQUOTE_TOOLBAR_BUTTON, CODE_BLOCK_TOOLBAR_BUTTON],
      },
      {
        items: [INSERT_TABLE_TOOLBAR_BUTTON],
      },
      {
        items: [IMAGE_TOOLBAR_BUTTON, FILE_LINK_TOOLBAR_BUTTON],
      },
    ],
  },
];

export interface ToolbarProps {
  useMdx: boolean;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ collection, field, disabled }) => {
  const buttons = useToolbarButtons(
    field.toolbar_buttons?.main ?? DEFAULT_TOOLBAR_BUTTONS,
    collection,
    field,
    disabled,
  );

  return <div className={classes.root}>{buttons}</div>;
};

export default Toolbar;
