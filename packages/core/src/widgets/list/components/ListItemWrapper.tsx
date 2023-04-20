import Collapse from '@mui/material/Collapse';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import { Close as CloseIcon } from '@styled-icons/material/Close';
import { Menu as MenuIcon } from '@styled-icons/material/Menu';
import React, { useCallback, useMemo, useState } from 'react';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import Label from '@staticcms/core/components/common/field/Label';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { MouseEvent, ReactNode } from 'react';

export interface DragHandleProps {
  listeners: SyntheticListenerMap | undefined;
  disabled: boolean;
}

const DragHandle = ({ listeners, disabled }: DragHandleProps) => {
  return (
    <span data-testid="drag-handle" className="flex items-center" {...(disabled ? {} : listeners)}>
      <MenuIcon
        className="
          h-3
          w-3
        "
      />
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

const ListItemWrapper = ({
  label,
  summary,
  collapsed = false,
  onRemove,
  listeners,
  hasErrors,
  children,
  isSingleField,
  disabled,
}: ListItemWrapperProps) => {
  const [open, setOpen] = useState(!collapsed);

  const handleOpenToggle = useCallback(() => {
    setOpen(oldOpen => !oldOpen);
  }, []);

  const renderedControls = useMemo(
    () => (
      <div className="flex gap-2 items-center">
        {onRemove ? (
          <IconButton
            data-testid="remove-button"
            size="small"
            variant="text"
            onClick={onRemove}
            disabled={disabled}
          >
            <CloseIcon
              className="
                h-5
                w-5
              "
            />
          </IconButton>
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
          `
            relative
            flex
            flex-col
          `,
          !hasErrors && 'group/active-list-item',
        )}
      >
        <div
          data-testid="list-item-objects"
          className={classNames(
            `
              relative
              ml-4
              text-sm
              text-gray-500
              border-l-2
              border-solid
              border-l-slate-400
            `,
            !disabled && 'group-focus-within/active-list-item:border-l-blue-500',
            hasErrors && 'border-l-red-500',
          )}
        >
          {children}
          <div className="absolute right-3 top-0 h-full flex items-center justify-end z-10">
            {renderedControls}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="list-item-field"
      className={classNames(
        `
          relative
          flex
          flex-col
        `,
        !hasErrors && 'group/active-list-item',
      )}
    >
      <div
        className="
          flex
          w-full
          pr-3
          text-left
          text-sm
          gap-2
          items-center
        "
      >
        <button
          data-testid="list-item-expand-button"
          className="
            flex
            w-full
            pl-2
            py-2
            text-left
            text-sm
            font-medium
            focus:outline-none
            focus-visible:ring
            gap-2
            focus-visible:ring-opacity-75
            items-center
          "
          onClick={handleOpenToggle}
        >
          <ChevronRightIcon
            className={classNames(
              open && 'rotate-90 transform',
              `
                transition-transform
                h-5
                w-5
              `,
              disabled
                ? `
                    text-slate-300
                    dark:text-slate-600
                  `
                : `
                    group-focus-within/active-list:text-blue-500
                    group-hover/active-list:text-blue-500
                  `,
            )}
          />
          <div className="flex-grow">
            <Label
              key="label"
              hasErrors={hasErrors}
              className={classNames(
                !disabled &&
                  `
                    group-focus-within/active-list-item:text-blue-500
                    group-hover/active-list-item:text-blue-500
                  `,
              )}
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
      {!open ? (
        <div
          className="
            ml-8
            border-b
            border-slate-400
            focus-within:border-blue-800
            dark:focus-within:border-blue-100
          "
        ></div>
      ) : null}
      <Collapse in={open} appear={false}>
        <div
          className={classNames(
            `
              ml-4
              text-sm
              text-gray-500
              border-l-2
              border-solid
              border-l-slate-400
            `,
            !disabled && 'group-focus-within/active-list-item:border-l-blue-500',
            hasErrors && 'border-l-red-500',
          )}
        >
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default ListItemWrapper;
