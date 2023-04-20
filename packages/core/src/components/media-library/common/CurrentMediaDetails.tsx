import React from 'react';

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
  onUrlChange,
  onAltChange,
}) => {
  if (!field || !canInsert || typeof url !== 'string' || isEmpty(url)) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-media-preview
        items-center
        px-5
        py-4
        border-b
        border-gray-200/75
        dark:border-slate-500/75
      "
    >
      <Image
        src={url}
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
      <div
        className="
          flex
          flex-col
          h-full
          p-0
          pl-4
          gap-2
        "
      >
        <InlineEditTextField
          label="URL"
          value={url}
          onChange={insertOptions?.chooseUrl ? onUrlChange : undefined}
        />
        {insertOptions?.showAlt ? (
          <InlineEditTextField label="Alt" value={alt} onChange={onAltChange} />
        ) : null}
      </div>
    </div>
  );
};

export default CurrentMediaDetails;
