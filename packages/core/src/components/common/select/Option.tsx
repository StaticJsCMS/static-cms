import OptionUnstyled from '@mui/base/OptionUnstyled';
import React, { useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';

import type { ReactNode } from 'react';

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
    <OptionUnstyled
      value={value}
      data-testid={dataTestId}
      slotProps={{
        root: {
          className: classNames(
            `
              relative
              select-none
              py-2
              px-4
              cursor-pointer
              text-gray-900
              hover:bg-blue-500
              dark:text-gray-100
            `,
            selected ? 'bg-blue-400/75' : '',
          ),
        },
      }}
    >
      <span className={classNames('block truncate', selected ? 'font-medium' : 'font-normal')}>
        {children}
      </span>
    </OptionUnstyled>
  );
};

export default Option;
