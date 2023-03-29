import SelectUnstyled from '@mui/base/SelectUnstyled';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { forwardRef, useCallback } from 'react';

import Option from './Option';

import type { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react';

export interface Option<T> {
  label: string;
  value: T;
}

function getOptionLabelAndValue<T>(option: T | Option<T>): Option<T> {
  if (option && typeof option === 'object' && 'label' in option && 'value' in option) {
    return option;
  }

  return { label: String(option), value: option };
}

export type SelectChangeEventHandler<T> = (value: T | T[]) => void;

export interface SelectProps<T> {
  label?: ReactNode | ReactNode[];
  placeholder?: string;
  value: T | T[] | null;
  options: T[] | Option<T>[];
  required?: boolean;
  disabled?: boolean;
  onChange: SelectChangeEventHandler<T>;
}

const Select = function <T>(
  { label, placeholder, value, options, required = false, disabled, onChange }: SelectProps<T>,
  ref: Ref<HTMLButtonElement>,
) {
  const handleChange = useCallback(
    (_event: MouseEvent | KeyboardEvent | FocusEvent | null, selectedValue: T) => {
      if (Array.isArray(value)) {
        const newValue = [...value];
        const index = newValue.indexOf(selectedValue);
        if (index > -1) {
          newValue.splice(index, 1);
        } else {
          newValue.push(selectedValue);
        }

        onChange(newValue);
        return;
      }

      onChange(selectedValue);
    },
    [onChange, value],
  );

  return (
    <div className="relative w-full">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <SelectUnstyled<any>
        renderValue={() => {
          return (
            <>
              {label ?? placeholder}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <KeyboardArrowDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </>
          );
        }}
        slotProps={{
          root: {
            ref,
            className: `
              flex
              items-center
              text-sm
              font-medium
              relative
              min-h-8
              px-4
              py-1.5
              w-full
              text-gray-900
              dark:text-gray-100
            `,
          },
          popper: {
            className: `
              absolute
              max-h-60
              overflow-auto
              rounded-md
              bg-white
              py-1
              text-base
              shadow-lg
              ring-1
              ring-black
              ring-opacity-5
              focus:outline-none
              sm:text-sm
              z-50
              dark:bg-slate-700
            `,
            disablePortal: false,
          },
        }}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        data-testid="select-input"
      >
        {!Array.isArray(value) && !required ? (
          <Option value={null} selectedValue={value}>
            <i>None</i>
          </Option>
        ) : null}
        {options.map((option, index) => {
          const { label: optionLabel, value: optionValue } = getOptionLabelAndValue(option);

          return (
            <Option
              key={index}
              value={optionValue}
              selectedValue={value}
              data-testid={`select-option-${optionValue}`}
            >
              {optionLabel}
            </Option>
          );
        })}
      </SelectUnstyled>
    </div>
  );
};

export default forwardRef(Select) as <T>(
  props: SelectProps<T> & { ref?: Ref<HTMLButtonElement> },
) => JSX.Element;
