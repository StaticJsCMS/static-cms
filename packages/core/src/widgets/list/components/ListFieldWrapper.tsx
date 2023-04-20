import Collapse from '@mui/material/Collapse';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import React, { useCallback, useMemo, useState } from 'react';

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
  forSingleList: boolean;
  disabled: boolean;
}

const ListFieldWrapper: FC<ListFieldWrapperProps> = ({
  field,
  openLabel,
  closedLabel,
  children,
  errors,
  hasChildErrors,
  hint,
  forSingleList,
  disabled,
}) => {
  const hasErrors = useMemo(() => errors.length > 0, [errors.length]);

  const [open, setOpen] = useState(!field.collapsed ?? true);

  const handleOpenToggle = useCallback(() => {
    setOpen(oldOpen => !oldOpen);
  }, []);

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
      <div
        data-testid="field-wrapper"
        className={classNames(
          `
            relative
            flex
            flex-col
            w-full
          `,
          forSingleList && 'mr-14',
        )}
      >
        <button
          data-testid="list-expand-button"
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
          onClick={handleOpenToggle}
        >
          <Label
            key="label"
            hasErrors={hasErrors || hasChildErrors}
            className={classNames(
              !disabled &&
                `
                  group-focus-within/active-list:text-blue-500
                  group-hover/active-list:text-blue-500
                `,
            )}
            cursor="pointer"
            variant="inline"
            disabled={disabled}
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
        </button>
        <Collapse in={open} appear={false}>
          <div
            className={classNames(
              `
                text-sm
                text-gray-500
              `,
              (hasErrors || hasChildErrors) && 'border-l-red-500',
            )}
          >
            <div data-testid="object-fields">{children}</div>
          </div>
        </Collapse>
        {hint ? (
          <Hint key="hint" hasErrors={hasErrors} cursor="pointer" disabled={disabled}>
            {hint}
          </Hint>
        ) : null}
        <ErrorMessage errors={errors} className="pb-3" />
      </div>
    </div>
  );
};

export default ListFieldWrapper;
