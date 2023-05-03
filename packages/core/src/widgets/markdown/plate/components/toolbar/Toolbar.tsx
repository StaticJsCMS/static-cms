import React from 'react';

import useToolbarButtons from '../../hooks/useToolbarButtons';

import type {
  Collection,
  MarkdownField,
  MarkdownToolbarButtonType,
} from '@staticcms/core/interface';
import type { FC } from 'react';

const DEFAULT_TOOLBAR_BUTTONS: MarkdownToolbarButtonType[] = [
  'bold',
  'italic',
  'strikethrough',
  'code',
  'font',
  'unordered-list',
  'ordered-list',
  'decrease-indent',
  'increase-indent',
  'shortcode',
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
