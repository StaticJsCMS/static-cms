import { FontDownload as FontDownloadIcon } from '@styled-icons/material/FontDownload';
import { FormatColorText as FormatColorTextIcon } from '@styled-icons/material/FormatColorText';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate';
import React from 'react';

import ColorPickerToolbarDropdown from './common/ColorPickerToolbarDropdown';

import type { FC } from 'react';

interface ColorToolbarButtonsProps {
  disabled: boolean;
}

const ColorToolbarButtons: FC<ColorToolbarButtonsProps> = ({ disabled }) => {
  return (
    <>
      <ColorPickerToolbarDropdown
        key="color-picker-button"
        pluginKey={MARK_COLOR}
        icon={<FormatColorTextIcon className="h-5 w-5" />}
        tooltip="Color"
        disabled={disabled}
      />
      <ColorPickerToolbarDropdown
        key="background-color-picker-button"
        pluginKey={MARK_BG_COLOR}
        icon={<FontDownloadIcon className="h-5 w-5" />}
        tooltip="Background Color"
        disabled={disabled}
      />
    </>
  );
};

export default ColorToolbarButtons;
