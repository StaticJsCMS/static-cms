import { Add as AddIcon } from '@styled-icons/material/Add';
import { Code as CodeIcon } from '@styled-icons/material/Code';
import { FormatQuote as FormatQuoteIcon } from '@styled-icons/material/FormatQuote';
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_IMAGE,
  ELEMENT_LINK,
  insertEmptyCodeBlock,
  toggleNodeType,
} from '@udecode/plate';
import React, { useCallback } from 'react';

import Menu from '@staticcms/core/components/common/menu/Menu';
import MenuGroup from '@staticcms/core/components/common/menu/MenuGroup';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { useMdPlateEditorState } from '../../plateTypes';
import ImageToolbarButton from './common/ImageToolbarButton';
import LinkToolbarButton from './common/LinkToolbarButton';

import type { Collection, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';

interface AddButtonsProps {
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const AddButtons: FC<AddButtonsProps> = ({ collection, field, disabled }) => {
  const editor = useMdPlateEditorState();

  const handleBlockOnClick = useCallback(
    (type: string, inactiveType?: string) => () => {
      toggleNodeType(editor, { activeType: type, inactiveType });
    },
    [editor],
  );

  const handleCodeBlockOnClick = useCallback(() => {
    insertEmptyCodeBlock(editor, {
      insertNodesOptions: { select: true },
    });
  }, [editor]);

  return (
    <Menu
      label={<AddIcon className="h-5 w-5" aria-hidden="true" />}
      data-testid="toolbar-add-buttons"
      keepMounted
      hideDropdownIcon
      variant="text"
      className="
        py-0.5
        px-0.5
        h-7
        w-7
      "
      disabled={disabled}
    >
      <MenuGroup>
        <MenuItemButton
          key={ELEMENT_BLOCKQUOTE}
          onClick={handleBlockOnClick(ELEMENT_BLOCKQUOTE)}
          startIcon={FormatQuoteIcon}
        >
          Blockquote
        </MenuItemButton>
        <MenuItemButton
          key={ELEMENT_CODE_BLOCK}
          onClick={handleCodeBlockOnClick}
          startIcon={CodeIcon}
        >
          Code Block
        </MenuItemButton>
      </MenuGroup>
      <MenuGroup>
        <ImageToolbarButton
          key={ELEMENT_IMAGE}
          collection={collection}
          field={field}
          variant="menu"
          disabled={disabled}
        />
        <LinkToolbarButton
          key={ELEMENT_LINK}
          collection={collection}
          field={field}
          variant="menu"
          disabled={disabled}
        />
      </MenuGroup>
    </Menu>
  );
};

export default AddButtons;
