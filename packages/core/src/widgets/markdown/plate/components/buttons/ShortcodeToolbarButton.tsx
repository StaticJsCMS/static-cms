import { DataArray as DataArrayIcon } from '@styled-icons/material/DataArray';
import { focusEditor, insertNodes } from '@udecode/plate';
import React, { useCallback, useMemo } from 'react';

import Menu from '@staticcms/core/components/common/menu/Menu';
import MenuGroup from '@staticcms/core/components/common/menu/MenuGroup';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { getShortcodes } from '@staticcms/core/lib/registry';
import { toTitleCase } from '@staticcms/core/lib/util/string.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { ELEMENT_SHORTCODE, useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';

import type { FC } from 'react';

import './ShortcodeToolbarButton.css';

const classes = generateClassNames('WidgetMarkdown_ShortcodeToolbarButton', [
  'root',
  'label-icon',
  'button',
]);

export interface ShortcodeToolbarButtonProps {
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
      label={<DataArrayIcon className={classes['label-icon']} aria-hidden="true" />}
      data-testid="toolbar-button-shortcode"
      keepMounted
      hideDropdownIcon
      color="secondary"
      variant="text"
      rootClassName={classes.root}
      buttonClassName={classes.button}
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
