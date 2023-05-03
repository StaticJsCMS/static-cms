import { Add as AddIcon } from '@styled-icons/material/Add';
import { Code as CodeIcon } from '@styled-icons/material/Code';
import { FormatBold as FormatBoldIcon } from '@styled-icons/material/FormatBold';
import { FormatItalic as FormatItalicIcon } from '@styled-icons/material/FormatItalic';
import { FormatStrikethrough as FormatStrikethroughIcon } from '@styled-icons/material/FormatStrikethrough';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH } from '@udecode/plate';
import React, { useMemo } from 'react';

import Menu from '@staticcms/core/components/common/menu/Menu';
import DecreaseIndentButton from '../components/buttons/IncreaseIndentButton';
import FontTypeSelect from '../components/buttons/FontTypeSelect';
import IncreaseIndentButton from '../components/buttons/DecreaseIndentButton';
import OrderedListButton from '../components/buttons/OrderedListButton';
import ShortcodeToolbarButton from '../components/buttons/ShortcodeToolbarButton';
import UnorderedListButton from '../components/buttons/UnorderedListButton';
import MarkToolbarButton from '../components/buttons/common/MarkToolbarButton';

import type { MarkdownToolbarItem } from '@staticcms/core/interface';

export default function useToolbarButtons(
  toolbarButtons: MarkdownToolbarItem[],
  disabled: boolean,
) {
  return useMemo(() => getToolbarButtons(toolbarButtons, disabled), [disabled, toolbarButtons]);
}

function getToolbarButtons(toolbarButtons: MarkdownToolbarItem[], disabled: boolean) {
  return toolbarButtons.map(button => {
    if (typeof button === 'string') {
      return getToolbarButton(button, disabled);
    }

    return (
      <Menu
        key={`menu-${button.label}`}
        label={<AddIcon className="h-5 w-5" aria-hidden="true" />}
        data-testid={`toolbar-menu-${button.label.toLowerCase().replace(' ', '-')}`}
        keepMounted
        hideDropdownIcon
        variant="text"
        className="
          py-0.5
          px-0.5
          h-6
          w-6
        "
        disabled={disabled}
      >
        {useToolbarButtons(button.items, disabled)}
      </Menu>
    );
  });
}

function getToolbarButton(name: MarkdownToolbarItem, disabled: boolean) {
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
  }
}
