import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { isNullish } from '@staticcms/core/lib/util/null.util';
import { isEmpty } from '../../../lib/util/string.util';
import Image from '../../common/image/Image';
import InlineEditTextField from './InlineEditTextField';
import mediaLibraryClasses from './MediaLibrary.classes';

import type { CollectionWithDefaults, MediaField, MediaLibrarInsertOptions } from '@staticcms/core';
import type { FC } from 'react';

interface CurrentMediaDetailsProps {
  collection?: CollectionWithDefaults;
  field?: MediaField;
  canInsert: boolean;
  url?: string | string[];
  alt?: string;
  insertOptions?: MediaLibrarInsertOptions;
  forImage: boolean;
  replaceIndex?: number;
  onUrlChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

const CurrentMediaDetails: FC<CurrentMediaDetailsProps> = ({
  collection,
  field,
  canInsert,
  url,
  alt,
  insertOptions,
  forImage,
  replaceIndex,
  onUrlChange,
  onAltChange,
}) => {
  if (!field || !canInsert) {
    return null;
  }

  if (Array.isArray(url)) {
    if (isNullish(replaceIndex)) {
      return null;
    }
  }

  if (
    !Array.isArray(url) &&
    !insertOptions?.chooseUrl &&
    !insertOptions?.showAlt &&
    (typeof url !== 'string' || isEmpty(url))
  ) {
    return null;
  }

  return (
    <div className={mediaLibraryClasses.preview}>
      {forImage ? (
        <Image
          key="image-preview"
          src={Array.isArray(url) ? url[replaceIndex!] : url}
          collection={collection}
          field={field}
          className={classNames(mediaLibraryClasses['preview-image'], 'group/media-card')}
        />
      ) : null}
      <div className={mediaLibraryClasses['preview-details']}>
        <InlineEditTextField
          label="URL"
          value={Array.isArray(url) ? url[replaceIndex!] : url}
          onChange={insertOptions?.chooseUrl ? onUrlChange : undefined}
        />
        {insertOptions?.showAlt ? (
          <InlineEditTextField
            label={forImage ? 'Alt' : 'Text'}
            value={alt}
            onChange={onAltChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CurrentMediaDetails;
