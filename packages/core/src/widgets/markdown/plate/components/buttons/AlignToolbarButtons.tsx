import { FormatAlignCenter as FormatAlignCenterIcon } from '@styled-icons/material/FormatAlignCenter';
import { FormatAlignLeft as FormatAlignLeftIcon } from '@styled-icons/material/FormatAlignLeft';
import { FormatAlignRight as FormatAlignRightIcon } from '@styled-icons/material/FormatAlignRight';
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
