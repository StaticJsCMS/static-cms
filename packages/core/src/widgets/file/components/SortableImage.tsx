import { CameraAlt as CameraAltIcon } from '@styled-icons/material/CameraAlt';
import { Close as CloseIcon } from '@styled-icons/material/Close';
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
          <CameraAltIcon key="image-replace-icon" className="h-5 w-5" />
        </IconButton>
        <IconButton key="image-remove" onClick={onRemove}>
          <CloseIcon key="image-remove-icon" className="h-5 w-5" />
        </IconButton>
      </div>
    </div>
  );
};

export default SortableImage;
