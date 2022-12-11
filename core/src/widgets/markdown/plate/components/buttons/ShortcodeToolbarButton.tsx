import DataArrayIcon from '@mui/icons-material/DataArray';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { focusEditor, insertNodes } from '@udecode/plate-core';
import React, { useCallback, useMemo, useState } from 'react';

import { getShortcodes } from '../../../../../lib/registry';
import { toTitleCase } from '../../../../../lib/util/string.util';
import { ELEMENT_SHORTCODE, useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC, MouseEvent } from 'react';
import type { MdEditor } from '../../plateTypes';

const ShortcodeToolbarButton: FC = () => {
  const editor = useMdPlateEditorState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((_editor: MdEditor, event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
      handleClose();
    },
    [editor, handleClose],
  );

  return (
    <>
      <ToolbarButton
        key="shortcode-button"
        tooltip="Add Shortcode"
        icon={<DataArrayIcon />}
        onClick={handleClick}
      />
      <Menu
        id="shortcode-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'shortcode-button',
        }}
      >
        {Object.keys(configs).map(name => {
          const config = configs[name];
          return (
            <MenuItem key={`shortcode-${name}`} onClick={handleShortcodeClick(name)}>
              {config.label ?? toTitleCase(name)}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ShortcodeToolbarButton;
