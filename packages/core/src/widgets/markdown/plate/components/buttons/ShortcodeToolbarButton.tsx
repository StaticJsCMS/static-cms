import { DataArray as DataArrayIcon } from '@styled-icons/material/DataArray';
import { focusEditor, insertNodes } from '@udecode/plate';
import React, { useCallback, useMemo } from 'react';

import Menu from '@staticcms/core/components/common/menu/Menu';
import MenuGroup from '@staticcms/core/components/common/menu/MenuGroup';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { getShortcodes } from '@staticcms/core/lib/registry';
import { toTitleCase } from '@staticcms/core/lib/util/string.util';
import { ELEMENT_SHORTCODE, useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';

import type { FC } from 'react';

interface ShortcodeToolbarButtonProps {
  disabled: boolean;
}

const ShortcodeToolbarButton: FC<ShortcodeToolbarButtonProps> = ({ disabled }) => {
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
    <Menu
      label={<DataArrayIcon className="h-5 w-5" aria-hidden="true" />}
      data-testid="add-buttons"
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
    </Menu>
  );
};

export default ShortcodeToolbarButton;
