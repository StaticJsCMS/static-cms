import { Code as CodeIcon } from '@styled-icons/material/Code';
import { FormatBold as FormatBoldIcon } from '@styled-icons/material/FormatBold';
import { FormatItalic as FormatItalicIcon } from '@styled-icons/material/FormatItalic';
import { FormatStrikethrough as FormatStrikethroughIcon } from '@styled-icons/material/FormatStrikethrough';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH } from '@udecode/plate';
import React, { useMemo } from 'react';

import AddButtons from '../buttons/AddButtons';
import DecreaseIndentButton from '../buttons/DecreaseIndentButton';
import FontTypeSelect from '../buttons/FontTypeSelect';
import IncreaseIndentButton from '../buttons/IncreaseIndentButton';
import OrderedListButton from '../buttons/OrderedListButton';
import ShortcodeToolbarButton from '../buttons/ShortcodeToolbarButton';
import UnorderedListButton from '../buttons/UnorderedListButton';
import MarkToolbarButton from '../buttons/common/MarkToolbarButton';

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
  'insert',
];

export interface ToolbarProps {
  useMdx: boolean;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ collection, field, disabled }) => {
  const buttons = useMemo(() => {
    const toolbarButtons = field.toolbar_buttons?.main ?? DEFAULT_TOOLBAR_BUTTONS;

    return toolbarButtons.map(name => {
      switch (name) {
        case 'bold':
          return (
            <MarkToolbarButton
              key="bold"
              tooltip="Bold"
              type={MARK_BOLD}
              icon={<FormatBoldIcon className="h-5 w-5" />}
              disabled={disabled}
            />
          );
        case 'italic':
          return (
            <MarkToolbarButton
              key="italic"
              tooltip="Italic"
              type={MARK_ITALIC}
              icon={<FormatItalicIcon className="h-5 w-5" />}
              disabled={disabled}
            />
          );
        case 'strikethrough':
          return (
            <MarkToolbarButton
              key="strikethrough"
              tooltip="Strikethrough"
              type={MARK_STRIKETHROUGH}
              icon={<FormatStrikethroughIcon className="h-5 w-5" />}
              disabled={disabled}
            />
          );
        case 'code':
          return (
            <MarkToolbarButton
              key="code"
              tooltip="Code"
              type={MARK_CODE}
              icon={<CodeIcon className="h-5 w-5" />}
              disabled={disabled}
            />
          );
        case 'font':
          return <FontTypeSelect key="font" disabled={disabled} />;

        case 'unordered-list':
          return <UnorderedListButton key="unordered-list" disabled={disabled} />;
        case 'ordered-list':
          return <OrderedListButton key="ordered-list" disabled={disabled} />;
        case 'decrease-indent':
          return <DecreaseIndentButton key="decrease-indent" disabled={disabled} />;
        case 'increase-indent':
          return <IncreaseIndentButton key="increase-indent" disabled={disabled} />;

        case 'shortcode':
          return <ShortcodeToolbarButton key="shortcode" disabled={disabled} />;

        case 'insert':
          return (
            <AddButtons key="insert" collection={collection} field={field} disabled={disabled} />
          );
      }
    });
  }, [collection, disabled, field]);

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
