import CodeIcon from '@mui/icons-material/Code';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from '@udecode/plate';
import React from 'react';

import MarkToolbarButton from './common/MarkToolbarButton';

import type { FC } from 'react';

export interface BasicMarkToolbarButtonsProps {
  extended?: boolean;
}

const BasicMarkToolbarButtons: FC<BasicMarkToolbarButtonsProps> = ({ extended = false }) => {
  return (
    <>
      <MarkToolbarButton tooltip="Bold" type={MARK_BOLD} icon={<FormatBoldIcon />} />
      <MarkToolbarButton tooltip="Italic" type={MARK_ITALIC} icon={<FormatItalicIcon />} />
      <MarkToolbarButton
        tooltip="Underline"
        type={MARK_UNDERLINE}
        icon={<FormatUnderlinedIcon />}
      />
      <MarkToolbarButton
        tooltip="Strikethrough"
        type={MARK_STRIKETHROUGH}
        icon={<FormatStrikethroughIcon />}
      />
      <MarkToolbarButton tooltip="Code" type={MARK_CODE} icon={<CodeIcon />} />
      {extended ? (
        <>
          <MarkToolbarButton
            tooltip="Superscript"
            type={MARK_SUPERSCRIPT}
            clear={MARK_SUBSCRIPT}
            icon={<SuperscriptIcon />}
          />
          <MarkToolbarButton
            tooltip="Subscript"
            type={MARK_SUBSCRIPT}
            clear={MARK_SUPERSCRIPT}
            icon={<SubscriptIcon />}
          />
        </>
      ) : null}
    </>
  );
};

export default BasicMarkToolbarButtons;
