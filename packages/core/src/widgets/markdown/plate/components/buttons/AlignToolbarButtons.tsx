import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import React from 'react';

import AlignToolbarButton from './common/AlignToolbarButton';

import type { FC } from 'react';

const AlignToolbarButtons: FC = () => {
  return (
    <>
      <AlignToolbarButton
        key="algin-button-left"
        tooltip="Align Left"
        value="left"
        icon={<FormatAlignLeftIcon />}
      />
      <AlignToolbarButton
        key="algin-button-center"
        tooltip="Align Center"
        value="center"
        icon={<FormatAlignCenterIcon />}
      />
      <AlignToolbarButton
        key="algin-button-right"
        tooltip="Align Right"
        value="right"
        icon={<FormatAlignRightIcon />}
      />
    </>
  );
};

export default AlignToolbarButtons;
