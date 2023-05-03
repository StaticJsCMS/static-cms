import React from 'react';

import useToolbarButtons from '../../hooks/useToolbarButtons';
import {
  BOLD_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  CODE_BLOCK_TOOLBAR_BUTTON,
  FONT_TOOLBAR_BUTTON,
  IMAGE_TOOLBAR_BUTTON,
  FILE_LINK_TOOLBAR_BUTTON,
  INSERT_TABLE_TOOLBAR_BUTTON,
  BLOCKQUOTE_TOOLBAR_BUTTON,
  SHORTCODE_TOOLBAR_BUTTON,
  INCRASE_IDENT_TOOLBAR_BUTTON,
  DECREASE_IDENT_TOOLBAR_BUTTON,
  ORDERED_LIST_TOOLBAR_BUTTON,
  UNORDERED_LIST_TOOLBAR_BUTTON,
} from '@staticcms/core/constants/toolbar_buttons';

import type { Collection, MarkdownField, MarkdownToolbarItem } from '@staticcms/core/interface';
import type { FC } from 'react';

const DEFAULT_TOOLBAR_BUTTONS: MarkdownToolbarItem[] = [
  BOLD_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  CODE_BLOCK_TOOLBAR_BUTTON,
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

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        select-none
        min-h-markdown-toolbar
        -mx-3
        -my-5
        px-2
        pt-2
        pb-1.5
        mb-1.5
        border-bottom-2
        border-gray-400
        gap-0.5
        shadow-md
        bg-slate-50
        dark:bg-slate-900
        sticky
        top-0
        z-10
      "
    >
      {buttons}
    </div>
  );
};

export default Toolbar;
