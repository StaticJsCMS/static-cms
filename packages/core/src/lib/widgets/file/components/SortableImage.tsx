import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CameraAlt as CameraAltIcon } from '@styled-icons/material/CameraAlt';
import { Delete as DeleteIcon } from '@styled-icons/material/Delete';
import React, { useCallback, useMemo } from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import Image from '@staticcms/core/components/common/image/Image';

import type { Collection, FileOrImageField } from '@staticcms/core/interface';
import type { FC, MouseEventHandler } from 'react';

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
      className="
        relative
        w-image-card
        h-image-card
      "
      tabIndex={-1}
      title={itemValue}
    >
      <div
        onClick={handleClick}
        data-testid={`image-card-${itemValue}`}
        className="
          w-image-card
          h-image-card
          rounded-md
          shadow-sm
          overflow-hidden
          group/image-card
          cursor-pointer
          border
          bg-gray-50/75
          border-gray-200/75
          dark:bg-slate-800
          dark:border-slate-600/75
        "
      >
        <div
          key="handle"
          data-testid={`image-card-handle-${itemValue}`}
          tabIndex={0}
          className="
            absolute
            inset-0
            rounded-md
            z-20
            overflow-visible
            focus:ring-4
            focus:ring-gray-200
            dark:focus:ring-slate-700
            focus-visible:outline-none
          "
        />
        <div
          className="
            absolute
            inset-0
            invisible
            transition-all
            rounded-md
            group-hover/image-card:visible
            group-hover/image-card:bg-blue-200/25
            dark:group-hover/image-card:bg-blue-400/60
            z-20
          "
        >
          <div
            className="
              absolute
              top-2
              right-2
              flex
              gap-1
            "
          >
            {onReplace ? (
              <IconButton
                key="replace"
                variant="text"
                onClick={handleReplace}
                className="
                text-white
                dark:text-white
                bg-gray-900/25
                dark:hover:text-blue-100
                dark:hover:bg-blue-800/80
              "
              >
                <CameraAltIcon className="w-5 h-5" />
              </IconButton>
            ) : null}
            {onRemove ? (
              <IconButton
                key="remove"
                variant="text"
                color="error"
                onClick={handleRemove}
                className="
                position: relative;
                text-red-400
                bg-gray-900/25
                dark:hover:text-red-600
                dark:hover:bg-red-800/40
                z-30
              "
              >
                <DeleteIcon className="w-5 h-5" />
              </IconButton>
            ) : null}
          </div>
        </div>
        <div className="relative">
          <Image
            src={itemValue}
            className="w-image-card h-image-card rounded-md"
            collection={collection}
            field={field}
          />
        </div>
      </div>
    </div>
  );
};

export default SortableImage;
