import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Delete as DeleteIcon } from '@styled-icons/material/Delete';
import { ModeEdit as ModeEditIcon } from '@styled-icons/material/ModeEdit';
import React, { useCallback, useMemo } from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC, MouseEventHandler } from 'react';

import './SortableLink.css';

const classes = generateClassNames('WidgetFileImage_SortableLink', [
  'root',
  'card',
  'content',
  'controls',
  'replace-button',
  'remove-button',
  'button-icon',
]);

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
      className={classes.root}
      tabIndex={-1}
      title={itemValue}
    >
      <div onClick={handleClick} data-testid={`image-card-${itemValue}`} className={classes.card}>
        <div className={classes.content}>
          <span>{text}</span>
          <div className={classes.controls}>
            {onReplace ? (
              <IconButton
                key="replace"
                variant="text"
                onClick={handleReplace}
                className={classes['replace-button']}
              >
                <ModeEditIcon className={classes['button-icon']} />
              </IconButton>
            ) : null}
            {onRemove ? (
              <IconButton
                key="remove"
                variant="text"
                color="error"
                onClick={handleRemove}
                className={classes['remove-button']}
              >
                <DeleteIcon className={classes['button-icon']} />
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortableLink;
