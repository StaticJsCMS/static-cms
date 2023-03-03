import React from 'react';

import Image from '../../common/image/Image';
import InlineEditTextField from './InlineEditTextField';

import type { MediaField, MediaLibrarInsertOptions } from '@staticcms/core/interface';
import type { FC } from 'react';

interface CurrentMediaDetailsProps {
  field?: MediaField;
  canInsert: boolean;
  value?: string | string[];
  insertOptions?: MediaLibrarInsertOptions;
  onUrlChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

const CurrentMediaDetails: FC<CurrentMediaDetailsProps> = ({
  field,
  canInsert,
  value,
  insertOptions,
  onUrlChange,
  onAltChange,
}) => {
  if (!field || !canInsert || typeof value !== 'string') {
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
      "
    >
      <Image
        src={value}
        field={field}
        className="
          w-media-preview-image
          h-media-preview-image
          rounded-md
          shadow-sm
          overflow-hidden
          group/media-card
          cursor-pointer
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
          pl-3
          gap-2
        "
      >
        <InlineEditTextField
          label="URL"
          value={value}
          onChange={insertOptions?.chooseUrl ? onUrlChange : undefined}
        />
        {insertOptions?.showAlt ? (
          <InlineEditTextField label="Alt" value={value} onChange={onAltChange} />
        ) : null}
      </div>
    </div>
  );
};

export default CurrentMediaDetails;
