import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import ErrorMessage from './ErrorMessage';
import Hint from './Hint';
import Label from './Label';

import type { FieldError } from '@staticcms/core/interface';
import type { FC, MouseEvent, ReactNode } from 'react';

export interface FieldProps {
  label?: string;
  inputRef?: React.MutableRefObject<HTMLElement | null>;
  children: ReactNode | ReactNode[];
  errors: FieldError[];
  variant?: 'default' | 'inline';
  cursor?: 'pointer' | 'text';
  noPadding?: boolean;
  hint?: string;
  forSingleList?: boolean;
}

const Field: FC<FieldProps> = ({
  inputRef,
  label,
  children,
  errors,
  variant = 'default',
  cursor = 'text',
  noPadding = false,
  hint,
  forSingleList,
}) => {
  const hasErrors = useMemo(() => errors.length > 0, [errors.length]);

  const handleOnClick = (event: MouseEvent) => {
    if (event.target !== inputRef?.current) {
      inputRef?.current?.focus();
      inputRef?.current?.click();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const renderedLabel = useMemo(
    () =>
      label ? (
        <Label key="label" hasErrors={hasErrors} variant={variant} cursor={cursor}>
          {label}
        </Label>
      ) : null,
    [cursor, hasErrors, label, variant],
  );

  const renderedHint = useMemo(
    () =>
      hint ? (
        <Hint key="hint" hasErrors={hasErrors} variant={variant} cursor={cursor}>
          {hint}
        </Hint>
      ) : null,
    [cursor, hasErrors, hint, variant],
  );

  const renderedErrorMessage = useMemo(() => <ErrorMessage errors={errors} />, [errors]);

  const rootClassNames = useMemo(
    () =>
      classNames(
        `
          relative
          flex
          border-b
          border-slate-400
          focus-within:border-blue-800
          dark:focus-within:border-blue-100
          focus-within:bg-slate-100
          dark:focus-within:bg-slate-800
          hover:bg-slate-100
          dark:hover:bg-slate-800
        `,
        !noPadding && 'pb-3',
        cursor === 'pointer' ? 'cursor-pointer' : 'cursor-text',
        !hasErrors && 'group/active',
      ),
    [cursor, hasErrors, noPadding],
  );

  const wrapperClassNames = useMemo(
    () =>
      classNames(
        `
          relative
          flex
          flex-col
          w-full
        `,
        forSingleList && 'mr-14',
      ),
    [forSingleList],
  );

  if (variant === 'inline') {
    return (
      <div data-testid="inline-field" className={rootClassNames} onClick={handleOnClick}>
        <div data-testid="inline-field-wrapper" className={wrapperClassNames}>
          <div className="flex items-center justify-center p-3 pb-0">
            {renderedLabel}
            {renderedHint}
            {children}
          </div>
          {renderedErrorMessage}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="field" className={rootClassNames} onClick={handleOnClick}>
      <div data-testid="field-wrapper" className={wrapperClassNames}>
        {renderedLabel}
        {children}
        {renderedHint}
        {renderedErrorMessage}
      </div>
    </div>
  );
};

export default Field;
