import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, insertEmptyCodeBlock } from '@udecode/plate';
import React from 'react';

import BlockToolbarButton from './common/BlockToolbarButton';
import FontTypeSelect from './FontTypeSelect';

import type { FC } from 'react';

export interface BasicElementToolbarButtonsProps {
  hideFontTypeSelect?: boolean;
  disableFontTypeSelect?: boolean;
  hideCodeBlock?: boolean;
}

const BasicElementToolbarButtons: FC<BasicElementToolbarButtonsProps> = ({
  hideFontTypeSelect = false,
  disableFontTypeSelect = false,
  hideCodeBlock = false,
}) => {
  return (
    <>
      {!hideFontTypeSelect ? <FontTypeSelect disabled={disableFontTypeSelect} /> : null}
      <BlockToolbarButton
        tooltip="Blockquote"
        type={ELEMENT_BLOCKQUOTE}
        icon={<FormatQuoteIcon />}
      />
      {!hideCodeBlock ? (
        <BlockToolbarButton
          tooltip="Code Block"
          type={ELEMENT_CODE_BLOCK}
          icon={<CodeIcon />}
          onClick={editor =>
            insertEmptyCodeBlock(editor, {
              insertNodesOptions: { select: true },
            })
          }
        />
      ) : null}
    </>
  );
};

export default BasicElementToolbarButtons;
