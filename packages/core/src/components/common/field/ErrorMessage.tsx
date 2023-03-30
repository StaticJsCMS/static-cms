import React from 'react';

import type { FC } from 'react';
import type { FieldError } from '@staticcms/core/interface';

export interface ErrorMessageProps {
  errors: FieldError[];
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errors }) => {
  return errors.length ? (
    <div
      key="error"
      data-testid="error"
      className="flex
        w-full
        text-xs
        text-red-500
        px-3
        pt-1"
    >
      {errors[0].message}
    </div>
  ) : null;
};

export default ErrorMessage;
