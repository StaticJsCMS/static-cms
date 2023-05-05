import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { isNullish } from '@staticcms/core/lib/util/null.util';
import { isEmpty } from '../../../lib/util/string.util';
import Image from '../../common/image/Image';
import InlineEditTextField from './InlineEditTextField';

import type { Collection, MediaField, MediaLibrarInsertOptions } from '@staticcms/core/interface';
import type { FC } from 'react';

interface CurrentMediaDetailsProps {
  collection?: Collection;
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
  console.log('url', url, 'replaceIndex', replaceIndex);

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
    <div
      className={classNames(
        `
          items-center
          px-5
          py-4
          border-b
          border-gray-200/75
          dark:border-slate-500/75
        `,
        forImage
          ? `
            grid
            grid-cols-media-preview
          `
          : `
            flex
            w-full
          `,
      )}
    >
      {forImage ? (
        <Image
          key="image-preview"
          src={Array.isArray(url) ? url[replaceIndex!] : url}
          collection={collection}
          field={field}
          className="
            w-media-preview-image
            h-media-preview-image
            rounded-md
            shadow-sm
            overflow-hidden
            group/media-card
            border
            bg-gray-50/75
            border-gray-200/75
            dark:bg-slate-800
            dark:border-slate-600/75
            object-cover
          "
        />
      ) : null}
      <div
        className={classNames(
          `
            flex
            flex-col
            h-full
            p-0
            gap-2
          `,
          forImage
            ? `
              pl-4
            `
            : `
              w-full
              pl-1.5
            `,
        )}
      >
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
