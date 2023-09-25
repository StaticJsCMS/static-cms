import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CameraAlt as CameraAltIcon } from '@styled-icons/material/CameraAlt';
import { Delete as DeleteIcon } from '@styled-icons/material/Delete';
import React, { useCallback, useMemo } from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import Image from '@staticcms/core/components/common/image/Image';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { Collection, FileOrImageField } from '@staticcms/core/interface';
import type { FC, MouseEventHandler } from 'react';

import './SortableImage.css';

const classes = generateClassNames('WidgetFileImage_SortableImage', [
  'root',
  'card',
  'handle',
  'controls-wrapper',
  'controls',
  'replace-button',
  'remove-button',
  'content',
  'image',
]);

export interface SortableImageProps {
  id: string;
  itemValue: string;
  collection: Collection<FileOrImageField>;
  field: FileOrImageField;
  onRemove?: MouseEventHandler;
  onReplace?: MouseEventHandler;
}

const SortableImage: FC<SortableImageProps> = ({
  id,
  itemValue,
  collection,
  field,
  onRemove,
  onReplace,
}) => {
  const sortableProps = useMemo(() => ({ id }), [id]);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable(sortableProps);

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition],
  );

  const handleClick: MouseEventHandler = useCallback(event => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  const handleReplace: MouseEventHandler = useCallback(
    event => {
      event.stopPropagation();
      event.preventDefault();
      onReplace?.(event);
    },
    [onReplace],
  );

  const handleRemove: MouseEventHandler = useCallback(
    event => {
      event.stopPropagation();
      event.preventDefault();
      onRemove?.(event);
    },
    [onRemove],
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classes.root}
      tabIndex={-1}
      title={itemValue}
    >
      <div onClick={handleClick} data-testid={`image-card-${itemValue}`} className={classes.card}>
        <div
          key="handle"
          data-testid={`image-card-handle-${itemValue}`}
          tabIndex={0}
          className={classes.handle}
        />
        <div className={classes['controls-wrapper']}>
          <div className={classes.controls}>
            {onReplace ? (
              <IconButton
                icon={CameraAltIcon}
                key="replace"
                variant="text"
                onClick={handleReplace}
                rootClassName={classes['replace-button']}
                aria-label="replace image"
              />
            ) : null}
            {onRemove ? (
              <IconButton
                icon={DeleteIcon}
                key="remove"
                variant="text"
                color="error"
                onClick={handleRemove}
                rootClassName={classes['remove-button']}
                aria-label="remove image"
              />
            ) : null}
          </div>
        </div>
        <div className={classes.content}>
          <Image src={itemValue} className={classes.image} collection={collection} field={field} />
        </div>
      </div>
    </div>
  );
};

export default SortableImage;
