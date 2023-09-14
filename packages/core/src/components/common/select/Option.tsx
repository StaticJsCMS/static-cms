import { Option as BaseOption } from '@mui/base/Option';
import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ReactNode } from 'react';

import './Option.css';

export const classes = generateClassNames('SelectOption', ['root', 'selected', 'label']);

export interface OptionProps<T> {
  selectedValue: T | null | T[];
  value: T | null;
  children: ReactNode;
  'data-testid'?: string;
}

const Option = function <T>({
  selectedValue,
  value,
  children,
  'data-testid': dataTestId,
}: OptionProps<T>) {
  const selected = useMemo(
    () =>
      Array.isArray(selectedValue) && isNotNullish(value)
        ? selectedValue.includes(value)
        : selectedValue === value,
    [selectedValue, value],
  );

  return (
    <BaseOption
      value={value}
      data-testid={dataTestId}
      slotProps={{
        root: {
          className: classNames(classes.root, selected && classes.selected),
        },
      }}
    >
      <span className={classes.label}>{children}</span>
    </BaseOption>
  );
};

export default Option;
