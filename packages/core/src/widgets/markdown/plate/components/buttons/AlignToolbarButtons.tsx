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
        icon={<FormatAlignLeftIcon className="h-5 w-5" />}
      />
      <AlignToolbarButton
        key="algin-button-center"
        tooltip="Align Center"
        value="center"
        icon={<FormatAlignCenterIcon className="h-5 w-5" />}
      />
      <AlignToolbarButton
        key="algin-button-right"
        tooltip="Align Right"
        value="right"
        icon={<FormatAlignRightIcon className="h-5 w-5" />}
      />
    </>
  );
};

export default AlignToolbarButtons;
