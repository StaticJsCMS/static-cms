import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ModeEdit as ModeEditIcon } from '@styled-icons/material/ModeEdit';
import { Delete as DeleteIcon } from '@styled-icons/material/Delete';
import React, { useCallback, useMemo } from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';

import type { FC, MouseEventHandler } from 'react';

const MAX_DISPLAY_LENGTH = 100;

export interface SortableLinkProps {
  id: string;
  itemValue: string;
  onRemove?: MouseEventHandler;
  onReplace?: MouseEventHandler;
}

const SortableLink: FC<SortableLinkProps> = ({ id, itemValue, onRemove, onReplace }) => {
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

  const text =
    itemValue.length <= MAX_DISPLAY_LENGTH
      ? itemValue
      : `${itemValue.slice(0, MAX_DISPLAY_LENGTH / 2)}\u2026${itemValue.slice(
          -(MAX_DISPLAY_LENGTH / 2) + 1,
        )}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        relative
        w-full
      "
      tabIndex={-1}
      title={itemValue}
    >
      <div
        onClick={handleClick}
        data-testid={`image-card-${itemValue}`}
        className="
          w-full
          shadow-sm
          overflow-hidden
          group/image-card
          cursor-pointer
          border-l-2
          border-b
          border-solid
          border-l-slate-400
          p-2
        "
      >
        <div className="relative flex items-center justify-between">
          <span>{text}</span>
          <div
            className="
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
                  dark:hover:text-blue-100
                  dark:hover:bg-blue-800/80
                "
              >
                <ModeEditIcon className="w-5 h-5" />
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
      </div>
    </div>
  );
};

export default SortableLink;
