import Collapse from '@mui/material/Collapse';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import { Close as CloseIcon } from '@styled-icons/material/Close';
import { Menu as MenuIcon } from '@styled-icons/material/Menu';
import React, { useCallback, useMemo, useState } from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import Label from '@staticcms/core/components/common/field/Label';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { FC, MouseEvent, ReactNode } from 'react';

import './ListItemWrapper.css';

const classes = generateClassNames('WidgetList_ListItem', [
  'root',
  'single-field-root',
  'error',
  'disabled',
  'open',
  'header',
  'expand-button',
  'expand-button-icon',
  'summary',
  'summary-label',
  'controls',
  'remove-button',
  'button-icon',
  'not-open-placeholder',
  'content',
  'single-field-controls',
  'drag-handle',
  'drag-handle-icon',
]);

export interface DragHandleProps {
  listeners: SyntheticListenerMap | undefined;
  disabled: boolean;
}

const DragHandle: FC<DragHandleProps> = ({ listeners, disabled }) => {
  return (
    <span
      data-testid="drag-handle"
      className={classes['drag-handle']}
      {...(disabled ? {} : listeners)}
    >
      <MenuIcon className={classes['drag-handle-icon']} />
    </span>
  );
};

export interface ListItemWrapperProps {
  className?: string;
  label: string;
  summary: string;
  collapsed?: boolean;
  onRemove: (event: MouseEvent) => void;
  listeners: SyntheticListenerMap | undefined;
  hasErrors: boolean;
  children: ReactNode;
  isSingleField: boolean;
  disabled: boolean;
}

const ListItemWrapper: FC<ListItemWrapperProps> = ({
  label,
  summary,
  collapsed = false,
  onRemove,
  listeners,
  hasErrors,
  children,
  isSingleField,
  disabled,
}) => {
  const [open, setOpen] = useState(!collapsed);

  const handleOpenToggle = useCallback(() => {
    setOpen(oldOpen => !oldOpen);
  }, []);

  const renderedControls = useMemo(
    () => (
      <div className={classes.controls}>
        {onRemove ? (
          <IconButton
            icon={CloseIcon}
            data-testid="remove-button"
            size="small"
            color="secondary"
            variant="text"
            onClick={onRemove}
            disabled={disabled}
            rootClassName={classes['remove-button']}
            iconClassName={classes['button-icon']}
            aria-label="remove"
          />
        ) : null}
        {listeners ? <DragHandle listeners={listeners} disabled={disabled} /> : null}
      </div>
    ),
    [disabled, listeners, onRemove],
  );

  if (isSingleField) {
    return (
      <div
        data-testid="list-item-field"
        className={classNames(
          classes['single-field-root'],
          hasErrors && classes.error,
          disabled && classes.disabled,
        )}
      >
        <div data-testid="list-item-objects" className={classes.content}>
          {children}
          <div className={classes['single-field-controls']}>{renderedControls}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="list-item-field"
      className={classNames(
        classes.root,
        hasErrors && classes.error,
        disabled && classes.disabled,
        open && classes.open,
      )}
    >
      <div className={classes.header}>
        <button
          data-testid="list-item-expand-button"
          className={classes['expand-button']}
          onClick={handleOpenToggle}
          aria-label={!open ? 'expand' : 'collapse'}
        >
          <ChevronRightIcon className={classes['expand-button-icon']} />
          <div className={classes.summary}>
            <Label
              key="label"
              hasErrors={hasErrors}
              className={classes['summary-label']}
              cursor="pointer"
              variant="inline"
              data-testid="item-label"
              disabled={disabled}
            >
              {label}
            </Label>
            {!open ? <span data-testid="item-summary">{summary}</span> : null}
          </div>
        </button>
        {renderedControls}
      </div>
      {!open ? <div className={classes['not-open-placeholder']}></div> : null}
      <Collapse in={open} appear={false}>
        <div className={classes.content}>{children}</div>
      </Collapse>
    </div>
  );
};

export default ListItemWrapper;
