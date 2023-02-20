import Bars3Icon from '@heroicons/react/20/solid/Bars3Icon';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import React, { useMemo } from 'react';
import { Disclosure, Transition } from '@headlessui/react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import Label from '@staticcms/core/components/common/field/Label';

import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { MouseEvent, ReactNode } from 'react';

export interface DragHandleProps {
  listeners: SyntheticListenerMap | undefined;
}

const DragHandle = ({ listeners }: DragHandleProps) => {
  return (
    <span {...listeners}>
      <Bars3Icon
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
}: ListItemWrapperProps) => {
  const renderedControls = useMemo(
    () => (
      <div className="flex gap-2 items-center">
        {onRemove ? (
          <div data-testid="remove-button" onClick={onRemove}>
            <XMarkIcon
              className="
              h-5
              w-5
            "
            />
          </div>
        ) : null}
        {listeners ? <DragHandle listeners={listeners} /> : null}
      </div>
    ),
    [listeners, onRemove],
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
              group-focus-within/active-list-item:border-l-blue-500
            `,
            hasErrors && 'border-l-red-500',
          )}
        >
          {children}
          <div className="absolute right-3 top-0 h-full flex items-center justify-end z-5">
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
      <Disclosure defaultOpen={!collapsed}>
        {({ open }) => (
          <>
            <Disclosure.Button
              data-testid="expand-button"
              className="
                flex
                w-full
                pl-2
                pr-3
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
            >
              <ChevronRightIcon
                className={classNames(
                  open && 'rotate-90 transform',
                  `
                    transition-transform
                    h-5
                    w-5
                    group-focus-within/active-list-item:text-blue-500
                    group-hover/active-list-item:text-blue-500
                  `,
                )}
              />
              <div className="flex-grow">
                <Label
                  key="label"
                  hasErrors={hasErrors}
                  className={`
                    group-focus-within/active-list-item:text-blue-500
                    group-hover/active-list-item:text-blue-500
                  `}
                  cursor="pointer"
                  variant="inline"
                >
                  {label}
                </Label>
                {!open ? summary : null}
              </div>
              {renderedControls}
            </Disclosure.Button>
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
            <Transition
              unmount={false}
              enter="transition duration-100 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <Disclosure.Panel
                data-testid="list-item-fields"
                unmount={false}
                className={classNames(
                  `
                    ml-4
                    text-sm
                    text-gray-500
                    border-l-2
                    border-solid
                    border-l-slate-400
                    group-focus-within/active-list-item:border-l-blue-500
                  `,
                  hasErrors && 'border-l-red-500',
                )}
              >
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ListItemWrapper;
