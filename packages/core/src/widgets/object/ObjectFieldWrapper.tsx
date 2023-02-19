import { Disclosure, Transition } from '@headlessui/react';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import React, { useMemo } from 'react';

import ErrorMessage from '@staticcms/core/components/common/field/ErrorMessage';
import Label from '@staticcms/core/components/common/field/Label';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FieldError } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';

export interface ObjectFieldWrapperProps {
  label?: string;
  children: ReactNode | ReactNode[];
  errors: FieldError[];
}

const ObjectFieldWrapper: FC<ObjectFieldWrapperProps> = ({ label, children, errors }) => {
  const hasErrors = useMemo(() => errors.length > 0, [errors.length]);

  const renderedLabel = useMemo(
    () =>
      label ? (
        <Label
          key="label"
          hasErrors={hasErrors}
          className={`
            group-focus-within/active-object:text-blue-500
            group-hover/active-object:text-blue-500
          `}
          cursor="pointer"
          variant="inline"
        >
          {label}
        </Label>
      ) : null,
    [hasErrors, label],
  );

  const renderedErrorMessage = useMemo(() => <ErrorMessage errors={errors} />, [errors]);

  return (
    <div
      data-testid="object-field"
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
        !hasErrors && 'group/active-object',
      )}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="
                flex
                w-full
                justify-between
                px-4
                py-2
                text-left
                text-sm
                font-medium
                focus:outline-none
                focus-visible:ring
                gap-2
                focus-visible:ring-opacity-75
              "
            >
              <ChevronRightIcon
                className={classNames(
                  open && 'rotate-90 transform',
                  `
                    transition-transform
                    h-5
                    w-5
                    group-focus-within/active-object:text-blue-500
                    group-hover/active-object:text-blue-500
                  `,
                )}
              />
              {renderedLabel}
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
                unmount={false}
                className="
                  ml-6
                  text-sm
                  text-gray-500
                  border-l-2
                  border-solid
                  border-l-slate-400
                  group-focus-within/active-object:border-l-blue-500
                "
              >
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      {renderedErrorMessage}
    </div>
  );
};

export default ObjectFieldWrapper;
