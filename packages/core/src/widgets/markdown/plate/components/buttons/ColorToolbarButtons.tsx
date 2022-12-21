import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate';
import React from 'react';

import ColorPickerToolbarDropdown from './common/ColorPickerToolbarDropdown';

import type { FC } from 'react';

const ColorToolbarButtons: FC = () => {
  return (
    <>
      <ColorPickerToolbarDropdown
        key="color-picker-button"
        pluginKey={MARK_COLOR}
        icon={<FormatColorTextIcon />}
        tooltip="Color"
      />
      <ColorPickerToolbarDropdown
        key="background-color-picker-button"
        pluginKey={MARK_BG_COLOR}
        icon={<FontDownloadIcon />}
        tooltip="Background Color"
      />
    </>
  );
};

export default ColorToolbarButtons;
