import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { FieldError } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface ErrorMessageProps {
  errors: FieldError[];
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errors, className }) => {
  return errors.length ? (
    <div
      key="error"
      data-testid="error"
      className={classNames(
        `
          flex
          w-full
          text-xs
          text-red-500
          px-3
          pt-2
        `,
        className,
      )}
    >
      {errors[0].message}
    </div>
  ) : null;
};

export default ErrorMessage;
