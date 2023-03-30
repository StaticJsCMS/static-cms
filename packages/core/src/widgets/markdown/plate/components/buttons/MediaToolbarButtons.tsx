import React from 'react';

import ImageToolbarButton from './common/ImageToolbarButton';
import LinkToolbarButton from './common/LinkToolbarButton';

import type { Collection, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface MediaToolbarButtonsProps {
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  hideImages?: boolean;
  disabled: boolean;
}

const MediaToolbarButtons: FC<MediaToolbarButtonsProps> = ({
  collection,
  field,
  hideImages = false,
  disabled,
}) => {
  return (
    <>
      <LinkToolbarButton
        key="link-button"
        collection={collection}
        field={field}
        disabled={disabled}
      />
      {!hideImages ? (
        <ImageToolbarButton
          key="image-button"
          collection={collection}
          field={field}
          disabled={disabled}
        />
      ) : null}
    </>
  );
};

export default MediaToolbarButtons;
