import { Code as CodeIcon } from '@styled-icons/material/Code';
import { FormatBold as FormatBoldIcon } from '@styled-icons/material/FormatBold';
import { FormatItalic as FormatItalicIcon } from '@styled-icons/material/FormatItalic';
import { FormatStrikethrough as FormatStrikethroughIcon } from '@styled-icons/material/FormatStrikethrough';
import { FormatUnderlined as FormatUnderlinedIcon } from '@styled-icons/material/FormatUnderlined';
import { Subscript as SubscriptIcon } from '@styled-icons/material/Subscript';
import { Superscript as SuperscriptIcon } from '@styled-icons/material/Superscript';
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
  useMdx: boolean;
  disabled: boolean;
}

const BasicMarkToolbarButtons: FC<BasicMarkToolbarButtonsProps> = ({
  extended = false,
  useMdx,
  disabled,
}) => {
  return (
    <>
      <MarkToolbarButton
        tooltip="Bold"
        type={MARK_BOLD}
        icon={<FormatBoldIcon className="h-5 w-5" />}
        disabled={disabled}
      />
      <MarkToolbarButton
        tooltip="Italic"
        type={MARK_ITALIC}
        icon={<FormatItalicIcon className="h-5 w-5" />}
        disabled={disabled}
      />
      {useMdx ? (
        <MarkToolbarButton
          key="underline-button"
          tooltip="Underline"
          type={MARK_UNDERLINE}
          icon={<FormatUnderlinedIcon className="h-5 w-5" />}
          disabled={disabled}
        />
      ) : null}
      <MarkToolbarButton
        tooltip="Strikethrough"
        type={MARK_STRIKETHROUGH}
        icon={<FormatStrikethroughIcon className="h-5 w-5" />}
        disabled={disabled}
      />
      <MarkToolbarButton
        tooltip="Code"
        type={MARK_CODE}
        icon={<CodeIcon className="h-5 w-5" />}
        disabled={disabled}
      />
      {useMdx && extended ? (
        <>
          <MarkToolbarButton
            key="superscript-button"
            tooltip="Superscript"
            type={MARK_SUPERSCRIPT}
            clear={MARK_SUBSCRIPT}
            icon={<SuperscriptIcon className="h-5 w-5" />}
            disabled={disabled}
          />
          <MarkToolbarButton
            key="subscript-button"
            tooltip="Subscript"
            type={MARK_SUBSCRIPT}
            clear={MARK_SUPERSCRIPT}
            icon={<SubscriptIcon className="h-5 w-5" />}
            disabled={disabled}
          />
        </>
      ) : null}
    </>
  );
};

export default BasicMarkToolbarButtons;
