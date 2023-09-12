import Collapse from '@mui/material/Collapse';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import React, { useCallback, useMemo, useState } from 'react';

import ErrorMessage from '@staticcms/core/components/common/field/ErrorMessage';
import Hint from '@staticcms/core/components/common/field/Hint';
import Label from '@staticcms/core/components/common/field/Label';
import classNames from '@staticcms/core/lib/util/classNames.util';
import widgetObjectClasses from './ObjectControl.classes';

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
        widgetObjectClasses.root,
        disabled && widgetObjectClasses.disabled,
        (hasErrors || hasChildErrors) && widgetObjectClasses.error,
        open && widgetObjectClasses.open,
      )}
    >
      <button
        data-testid="expand-button"
        className={widgetObjectClasses.expand}
        onClick={handleOpenToggle}
      >
        <ChevronRightIcon className={widgetObjectClasses['expand-icon']} />
        <Label
          key="label"
          hasErrors={hasErrors || hasChildErrors}
          className={widgetObjectClasses.summary}
          cursor="pointer"
          variant="inline"
          disabled={disabled}
        >
          {open ? openLabel : closedLabel}
        </Label>
      </button>
      <Collapse in={open} appear={false}>
        <div data-testid="object-fields" className={widgetObjectClasses.fields}>
          {children}
        </div>
      </Collapse>
      {hint ? (
        <Hint key="hint" hasErrors={hasErrors} cursor="pointer" disabled={disabled}>
          {hint}
        </Hint>
      ) : null}
      <ErrorMessage errors={errors} className={widgetObjectClasses['error-message']} />
    </div>
  );
};

export default ObjectFieldWrapper;
