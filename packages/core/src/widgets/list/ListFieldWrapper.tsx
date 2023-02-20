import { Disclosure, Transition } from '@headlessui/react';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import React, { useMemo } from 'react';

import ErrorMessage from '@staticcms/core/components/common/field/ErrorMessage';
import Hint from '@staticcms/core/components/common/field/Hint';
import Label from '@staticcms/core/components/common/field/Label';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FieldError, ListField } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';

export interface ListFieldWrapperProps {
  field: ListField;
  openLabel: string;
  closedLabel: string;
  children: ReactNode | ReactNode[];
  errors: FieldError[];
  hasChildErrors: boolean;
  hint?: string;
}

const ListFieldWrapper: FC<ListFieldWrapperProps> = ({
  field,
  openLabel,
  closedLabel,
  children,
  errors,
  hasChildErrors,
  hint,
}) => {
  const hasErrors = useMemo(() => errors.length > 0, [errors.length]);

  const defaultOpen = useMemo(() => !field.collapsed ?? true, [field.collapsed]);

  return (
    <div
      data-testid="list-field"
      className={classNames(
        `
          relative
          flex
          flex-col
          border-b
          border-slate-400
          focus-within:border-blue-800
          dark:focus-within:border-blue-100
        `,
        !(hasErrors || hasChildErrors) && 'group/active-list',
      )}
    >
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              data-testid="expand-button"
              className="
                flex
                w-full
                justify-between
                px-3
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
              <Label
                key="label"
                hasErrors={hasErrors || hasChildErrors}
                className={`
                  group-focus-within/active-list:text-blue-500
                  group-hover/active-list:text-blue-500
                `}
                cursor="pointer"
                variant="inline"
              >
                {open ? openLabel : closedLabel}
              </Label>
              <ChevronRightIcon
                className={classNames(
                  open && 'rotate-90 transform',
                  `
                    transition-transform
                    h-5
                    w-5
                    group-focus-within/active-list:text-blue-500
                    group-hover/active-list:text-blue-500
                  `,
                )}
              />
            </Disclosure.Button>
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
                data-testid="object-fields"
                unmount={false}
                className={classNames(
                  `
                    text-sm
                    text-gray-500
                  `,
                  (hasErrors || hasChildErrors) && 'border-l-red-500',
                )}
              >
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      {hint ? (
        <Hint key="hint" hasErrors={hasErrors} cursor="pointer">
          {hint}
        </Hint>
      ) : null}
      <ErrorMessage errors={errors} />
    </div>
  );
};

export default ListFieldWrapper;
