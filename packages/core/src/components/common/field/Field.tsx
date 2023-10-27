import React, { useMemo } from 'react';

import useCursor from '@staticcms/core/lib/hooks/useCursor';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import ErrorMessage from './ErrorMessage';
import Hint from './Hint';
import Label from './Label';

import type { FieldError } from '@staticcms/core/interface';
import type { FC, MouseEvent, ReactNode } from 'react';

import './Field.css';

export const classes = generateClassNames('Field', [
  'root',
  'inline',
  'wrapper',
  'inline-wrapper',
  'disabled',
  'no-highlight',
  'no-padding',
  'cursor-pointer',
  'cursor-text',
  'cursor-default',
  'error',
  'valid',
  'for-single-list',
  'end-adornment',
  'hint',
  'label',
]);

export interface FieldProps {
  label?: string;
  inputRef?: React.MutableRefObject<HTMLElement | null>;
  children: ReactNode | ReactNode[];
  errors: FieldError[];
  variant?: 'default' | 'inline';
  cursor?: 'default' | 'pointer' | 'text';
  hint?: string;
  forSingleList?: boolean;
  noPadding?: boolean;
  noHightlight?: boolean;
  disabled: boolean;
  disableClick?: boolean;
  endAdornment?: ReactNode;
  rootClassName?: string;
  wrapperClassName?: string;
}

const Field: FC<FieldProps> = ({
  inputRef,
  label,
  children,
  errors,
  variant = 'default',
  cursor = 'default',
  hint,
  forSingleList,
  noPadding = false,
  noHightlight = false,
  disabled,
  disableClick = false,
  endAdornment,
  rootClassName,
  wrapperClassName,
}) => {
  const finalCursor = useCursor(cursor, disabled);

  const hasErrors = useMemo(() => errors.length > 0, [errors.length]);

  const handleOnClick = (event: MouseEvent) => {
    if (disabled || disableClick) {
      return;
    }

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
        <Label
          key="label"
          hasErrors={hasErrors}
          variant={variant}
          cursor={finalCursor}
          disabled={disabled}
          className={classes.label}
        >
          {label.trim()}
        </Label>
      ) : null,
    [finalCursor, disabled, hasErrors, label, variant],
  );

  const renderedHint = useMemo(
    () =>
      hint ? (
        <Hint
          key="hint"
          hasErrors={hasErrors}
          variant={variant}
          cursor={finalCursor}
          disabled={disabled}
          className={classes.hint}
        >
          {hint}
        </Hint>
      ) : null,
    [disabled, finalCursor, hasErrors, hint, variant],
  );

  const renderedErrorMessage = useMemo(() => <ErrorMessage errors={errors} />, [errors]);

  const rootClassNames = useMemo(
    () =>
      classNames(
        classes.root,
        rootClassName,
        disabled && classes.disabled,
        noHightlight && classes['no-highlight'],
        noPadding && classes['no-padding'],
        finalCursor === 'pointer' && classes['cursor-pointer'],
        finalCursor === 'text' && classes['cursor-text'],
        finalCursor === 'default' && classes['cursor-default'],
        hasErrors && classes.error,
      ),
    [rootClassName, noHightlight, disabled, noPadding, finalCursor, hasErrors],
  );

  const wrapperClassNames = useMemo(
    () =>
      classNames(classes.wrapper, wrapperClassName, forSingleList && classes['for-single-list']),
    [forSingleList, wrapperClassName],
  );

  if (variant === 'inline') {
    return (
      <div
        data-testid="inline-field"
        className={`${rootClassNames} ${classes.inline}`}
        onClick={handleOnClick}
      >
        <div data-testid="inline-field-wrapper" className={wrapperClassNames}>
          <div className={classes['inline-wrapper']}>
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
    <div data-testid={`field-${label?.trim()}`} className={rootClassNames} onClick={handleOnClick}>
      <div data-testid="field-wrapper" className={wrapperClassNames}>
        {renderedLabel}
        {children}
        {renderedHint}
        {renderedErrorMessage}
      </div>
      {endAdornment ? <div className={classes['end-adornment']}>{endAdornment}</div> : null}
    </div>
  );
};

export default Field;
