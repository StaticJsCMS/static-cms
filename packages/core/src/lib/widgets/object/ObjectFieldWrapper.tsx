import Collapse from '@mui/material/Collapse';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import React, { useCallback, useMemo, useState } from 'react';

import ErrorMessage from '@staticcms/core/components/common/field/ErrorMessage';
import Hint from '@staticcms/core/components/common/field/Hint';
import Label from '@staticcms/core/components/common/field/Label';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FieldError, ObjectField } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';

export interface ObjectFieldWrapperProps {
  field: ObjectField;
  openLabel: string;
  closedLabel: string;
  children: ReactNode | ReactNode[];
  errors: FieldError[];
  hasChildErrors: boolean;
  hint?: string;
  disabled: boolean;
}

const ObjectFieldWrapper: FC<ObjectFieldWrapperProps> = ({
  field,
  openLabel,
  closedLabel,
  children,
  errors,
  hasChildErrors,
  hint,
  disabled,
}) => {
  const hasErrors = useMemo(() => errors.length > 0, [errors.length]);

  const [open, setOpen] = useState(!field.collapsed ?? true);

  const handleOpenToggle = useCallback(() => {
    setOpen(oldOpen => !oldOpen);
  }, []);

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
        !(hasErrors || hasChildErrors) && 'group/active-object',
      )}
    >
      <button
        data-testid="expand-button"
        className="
          flex
          w-full
          justify-between
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
        <Label
          key="label"
          hasErrors={hasErrors || hasChildErrors}
          className={classNames(
            !disabled &&
              `
                group-focus-within/active-object:text-blue-500
                group-hover/active-object:text-blue-500
              `,
          )}
          cursor="pointer"
          variant="inline"
          disabled={disabled}
        >
          {open ? openLabel : closedLabel}
        </Label>
      </button>
      <Collapse in={open} appear={false}>
        <div
          data-testid="object-fields"
          className={classNames(
            `
              ml-4
              text-sm
              text-gray-500
              border-l-2
              border-solid
              border-l-slate-400
            `,
            !disabled && 'group-focus-within/active-object:border-l-blue-500',
            (hasErrors || hasChildErrors) && 'border-l-red-500',
          )}
        >
          {children}
        </div>
      </Collapse>
      {hint ? (
        <Hint key="hint" hasErrors={hasErrors} cursor="pointer" disabled={disabled}>
          {hint}
        </Hint>
      ) : null}
      <ErrorMessage errors={errors} className="pl-4 pt-2 pb-3" />
    </div>
  );
};

export default ObjectFieldWrapper;
