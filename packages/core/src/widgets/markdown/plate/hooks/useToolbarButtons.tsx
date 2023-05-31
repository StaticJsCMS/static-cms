import { Add as AddIcon } from '@styled-icons/material/Add';
import React, { useMemo } from 'react';

import Menu from '@staticcms/core/components/common/menu/Menu';
import MenuGroup from '@staticcms/core/components/common/menu/MenuGroup';
import BlockquoteToolbarButton from '../components/buttons/BlockquoteToolbarButton';
import BoldToolbarButton from '../components/buttons/BoldToolbarButton';
import CodeBlockToolbarButtons from '../components/buttons/CodeBlockToolbarButtons';
import CodeToolbarButton from '../components/buttons/CodeToolbarButton';
import IncreaseIndentButton from '../components/buttons/DecreaseIndentToolbarButton';
import DeleteColumnToolbarButton from '../components/buttons/DeleteColumnToolbarButton';
import DeleteRowToolbarButton from '../components/buttons/DeleteRowToolbarButton';
import DeleteTableToolbarButton from '../components/buttons/DeleteTableToolbarButton';
import FontTypeSelect from '../components/buttons/FontTypeSelect';
import DecreaseIndentButton from '../components/buttons/IncreaseIndentToolbarButton';
import InsertColumnToolbarButton from '../components/buttons/InsertColumnToolbarButton';
import InsertImageToolbarButton from '../components/buttons/InsertImageToolbarButton';
import InsertLinkToolbarButton from '../components/buttons/InsertLinkToolbarButton';
import InsertRowToolbarButton from '../components/buttons/InsertRowToolbarButton';
import InsertTableToolbarButton from '../components/buttons/InsertTableToolbarButton';
import ItalicToolbarButton from '../components/buttons/ItalicToolbarButton';
import OrderedListButton from '../components/buttons/OrderedListToolbarButton';
import ShortcodeToolbarButton from '../components/buttons/ShortcodeToolbarButton';
import StrikethroughToolbarButton from '../components/buttons/StrikethroughToolbarButton';
import UnorderedListButton from '../components/buttons/UnorderedListToolbarButton';

import type {
  Collection,
  LowLevelMarkdownToolbarButtonType,
  MarkdownField,
  MarkdownToolbarButtonType,
  MarkdownToolbarItem,
} from '@staticcms/core/interface';
import type { ReactNode } from 'react';

export default function useToolbarButtons(
  toolbarButtons: MarkdownToolbarItem[],
  collection: Collection<MarkdownField>,
  field: MarkdownField,
  disabled: boolean,
): ReactNode[] {
  return useMemo(
    () => getToolbarButtons(toolbarButtons, collection, field, disabled),
    [collection, disabled, field, toolbarButtons],
  );
}

export function getToolbarButtons(
  toolbarButtons: MarkdownToolbarItem[] | MarkdownToolbarButtonType[],
  collection: Collection<MarkdownField>,
  field: MarkdownField,
  disabled: boolean,
): ReactNode[] {
  return toolbarButtons.map(button => {
    if (typeof button === 'string') {
      return getToolbarButton(button, collection, field, disabled, 'button');
    }

    return (
      <Menu
        key={`menu-${button.label}`}
        label={<AddIcon className="h-5 w-5" aria-hidden="true" />}
        data-testid={`toolbar-menu-${button.label.toLowerCase().replace(' ', '-')}`}
        keepMounted
        hideDropdownIcon
        variant="text"
        buttonClassName="
          py-0.5
          px-0.5
          h-6
          w-6
        "
        disabled={disabled}
      >
        {button.groups.map((group, index) => {
          if (group.items.length === 0) {
            return null;
          }

          return (
            <MenuGroup key={`group-${index}`}>
              {group.items.map(item => getToolbarButton(item, collection, field, disabled, 'menu'))}
            </MenuGroup>
          );
        })}
      </Menu>
    );
  });
}

function getToolbarButton(
  name: MarkdownToolbarButtonType,
  collection: Collection<MarkdownField>,
  field: MarkdownField,
  disabled: boolean,
  variant: 'button',
): ReactNode;
function getToolbarButton(
  name: LowLevelMarkdownToolbarButtonType,
  collection: Collection<MarkdownField>,
  field: MarkdownField,
  disabled: boolean,
  variant: 'menu',
): ReactNode;
function getToolbarButton(
  name: MarkdownToolbarButtonType | LowLevelMarkdownToolbarButtonType,
  collection: Collection<MarkdownField>,
  field: MarkdownField,
  disabled: boolean,
  variant: 'button' | 'menu',
): ReactNode {
  switch (name) {
    case 'blockquote':
      return <BlockquoteToolbarButton key="bold" disabled={disabled} variant={variant} />;

    case 'bold':
      return <BoldToolbarButton key="bold" disabled={disabled} variant={variant} />;

    case 'code':
      return <CodeToolbarButton key="code" disabled={disabled} variant={variant} />;

    case 'code-block':
      return <CodeBlockToolbarButtons key="code" disabled={disabled} variant={variant} />;

    case 'decrease-indent':
      return <DecreaseIndentButton key="decrease-indent" disabled={disabled} variant={variant} />;

    case 'delete-column':
      return (
        <DeleteColumnToolbarButton key="delete-column" disabled={disabled} variant={variant} />
      );

    case 'delete-row':
      return <DeleteRowToolbarButton key="delete-row" disabled={disabled} variant={variant} />;

    case 'delete-table':
      return <DeleteTableToolbarButton key="delete-table" disabled={disabled} variant={variant} />;

    case 'font':
      if (variant === 'menu') {
        return null;
      }

      return <FontTypeSelect key="font" disabled={disabled} />;

    case 'increase-indent':
      return <IncreaseIndentButton key="increase-indent" disabled={disabled} variant={variant} />;

    case 'insert-column':
      return (
        <InsertColumnToolbarButton key="insert-column" disabled={disabled} variant={variant} />
      );

    case 'image':
      return (
        <InsertImageToolbarButton
          key="image"
          disabled={disabled}
          variant={variant}
          collection={collection}
          field={field}
        />
      );

    case 'file-link':
      return (
        <InsertLinkToolbarButton
          key="file-link"
          disabled={disabled}
          variant={variant}
          collection={collection}
          field={field}
        />
      );

    case 'insert-row':
      return <InsertRowToolbarButton key="insert-row" disabled={disabled} variant={variant} />;

    case 'insert-table':
      return <InsertTableToolbarButton key="insert-table" disabled={disabled} variant={variant} />;

    case 'italic':
      return <ItalicToolbarButton key="italic" disabled={disabled} variant={variant} />;

    case 'ordered-list':
      return <OrderedListButton key="ordered-list" disabled={disabled} variant={variant} />;

    case 'shortcode':
      if (variant === 'menu') {
        return null;
      }

      return <ShortcodeToolbarButton key="shortcode" disabled={disabled} />;

    case 'strikethrough':
      return (
        <StrikethroughToolbarButton key="strikethrough" disabled={disabled} variant={variant} />
      );

    case 'unordered-list':
      return <UnorderedListButton key="unordered-list" disabled={disabled} variant={variant} />;

    default:
      return null;
  }
}
