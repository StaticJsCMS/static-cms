import { Menu, Transition } from '@headlessui/react';
import { DataArray as DataArrayIcon } from '@styled-icons/material/DataArray';
import { focusEditor, insertNodes } from '@udecode/plate-core';
import React, { useCallback, useMemo } from 'react';

import MenuGroup from '@staticcms/core/components/common/menu/MenuGroup';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { ELEMENT_SHORTCODE, useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import { getShortcodes } from '../../../../../lib/registry';
import { toTitleCase } from '../../../../../lib/util/string.util';

import type { FC } from 'react';

const ShortcodeToolbarButton: FC = () => {
  const editor = useMdPlateEditorState();

  const configs = useMemo(() => getShortcodes(), []);

  const handleShortcodeClick = useCallback(
    (shortcode: string) => () => {
      insertNodes(editor, {
        type: ELEMENT_SHORTCODE,
        shortcode,
        args: [],
        children: [{ text: '' }],
      });
      focusEditor(editor);
    },
    [editor],
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
        <DataArrayIcon className="h-5 w-5" aria-hidden="true" />
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
            {Object.keys(configs).map(name => {
              const config = configs[name];
              return (
                <MenuItemButton key={`shortcode-${name}`} onClick={handleShortcodeClick(name)}>
                  {config.label ?? toTitleCase(name)}
                </MenuItemButton>
              );
            })}
          </MenuGroup>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ShortcodeToolbarButton;
