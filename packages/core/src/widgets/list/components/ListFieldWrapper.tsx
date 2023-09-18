import Collapse from '@mui/material/Collapse';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import React, { useCallback, useMemo, useState } from 'react';

import ErrorMessage from '@staticcms/core/components/common/field/ErrorMessage';
import Hint from '@staticcms/core/components/common/field/Hint';
import Label from '@staticcms/core/components/common/field/Label';
import classNames from '@staticcms/core/lib/util/classNames.util';
import widgetListClasses from '../ListControl.classes';

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
        widgetListClasses.root,
        disabled && widgetListClasses.disabled,
        field.required !== false && widgetListClasses.required,
        (hasErrors || hasChildErrors) && widgetListClasses.error,
        forSingleList && widgetListClasses['for-single-list'],
        open && widgetListClasses.open,
      )}
    >
      <div data-testid="field-wrapper" className={widgetListClasses['field-wrapper']}>
        <button
          data-testid="list-expand-button"
          className={widgetListClasses['expand-button']}
          onClick={handleOpenToggle}
        >
          <Label
            key="label"
            hasErrors={hasErrors || hasChildErrors}
            className={widgetListClasses.summary}
            cursor="pointer"
            variant="inline"
            disabled={disabled}
          >
            {open ? openLabel : closedLabel}
          </Label>
          <ChevronRightIcon className={widgetListClasses['expand-button-icon']} />
        </button>
        <Collapse in={open} appear={false}>
          <div className={widgetListClasses.content}>
            <div data-testid="object-fields">{children}</div>
          </div>
        </Collapse>
        {hint ? (
          <Hint key="hint" hasErrors={hasErrors} cursor="pointer" disabled={disabled}>
            {hint}
          </Hint>
        ) : null}
        <ErrorMessage errors={errors} className={widgetListClasses['error-message']} />
      </div>
    </div>
  );
};

export default ListFieldWrapper;
