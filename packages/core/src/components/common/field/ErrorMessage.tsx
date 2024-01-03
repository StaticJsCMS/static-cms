import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FieldError } from '@staticcms/core';
import type { FC } from 'react';

import './ErrorMessage.css';

export const classes = generateClassNames('ErrorMessage', ['root']);

export interface ErrorMessageProps {
  errors: FieldError[];
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errors, className }) => {
  return errors.length ? (
    <div key="error" data-testid="error" className={classNames(classes.root, className)}>
      {errors[0].message}
    </div>
  ) : null;
};

export default ErrorMessage;
