import CameraIcon from '@heroicons/react/20/solid/CameraIcon';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import React from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import Image from '@staticcms/core/components/common/image/Image';

import type { Collection, FileOrImageField } from '@staticcms/core/interface';
import type { FC, MouseEventHandler } from 'react';

export interface SortableImageProps {
  itemValue: string;
  collection: Collection<FileOrImageField>;
  field: FileOrImageField;
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImage: FC<SortableImageProps> = ({
  itemValue,
  collection,
  field,
  onRemove,
  onReplace,
}: SortableImageProps) => {
  return (
    <div>
      <div key="image-wrapper">
        {/* TODO $sortable */}
        <Image key="image" src={itemValue} collection={collection} field={field} />
      </div>
      <div key="image-buttons-wrapper">
        <IconButton key="image-replace" onClick={onReplace}>
          <CameraIcon key="image-replace-icon" />
        </IconButton>
        <IconButton key="image-remove" onClick={onRemove}>
          <XMarkIcon key="image-remove-icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default SortableImage;
