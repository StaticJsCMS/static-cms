import { Menu, Transition } from '@headlessui/react';
import PlusIcon from '@heroicons/react/20/solid/PlusIcon';
import { Code as CodeIcon } from '@styled-icons/material/Code';
import { FormatQuote as FormatQuoteIcon } from '@styled-icons/material/FormatQuote';
import { Image as ImageIcon } from '@styled-icons/material/Image';
import { Link as LinkIcon } from '@styled-icons/material/Link';
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_IMAGE,
  ELEMENT_LINK,
  insertEmptyCodeBlock,
  toggleNodeType,
} from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuGroup from '@staticcms/core/components/common/menu/MenuGroup';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { useMdPlateEditorState } from '../../plateTypes';
import { useMediaInsert } from '@staticcms/core/lib';

import type { FC } from 'react';
import type { Collection, MarkdownField } from '@staticcms/core/interface';

interface AddButtonsProps {
  collection: Collection<MarkdownField>;
  field: MarkdownField;
}

const AddButtons: FC = () => {
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

  const ddd = useMediaInsert();

  const handleMediaOnClick = useCallback(
    (forImage = false) =>
      () => {
        console.log('forImage', forImage);
      },
    [],
  );

  return (
    <Menu as="div" className="relative text-left flex items-center">
      <Menu.Button
        className="
          btn
          btn-text-primary
          py-0.5
          px-0.5
          h-7
          w-7
        "
        data-testid="add-buttons"
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="z-30"
      >
        <Menu.Items className="absolute right-0 z-30 mt-6 w-40 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none divide-y divide-gray-100 dark:divide-gray-600">
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
            <MenuItemButton
              key={ELEMENT_IMAGE}
              onClick={handleMediaOnClick(true)}
              startIcon={ImageIcon}
            >
              Image
            </MenuItemButton>
            <MenuItemButton key={ELEMENT_LINK} onClick={handleMediaOnClick()} startIcon={LinkIcon}>
              File / Link
            </MenuItemButton>
          </MenuGroup>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AddButtons;
