import SelectUnstyled from '@mui/base/SelectUnstyled';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { forwardRef, useCallback, useState } from 'react';

import useElementSize from '@staticcms/core/lib/hooks/useElementSize';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Option from './Option';

import type { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react';

import './Select.css';

export const classes = generateClassNames('Select', [
  'root',
  'disabled',
  'input',
  'value',
  'label',
  'label-text',
  'dropdown',
  'dropdown-icon',
  'input',
  'popper',
]);

export interface Option {
  label: string;
  value: number | string;
}

function getOptionLabelAndValue(option: number | string | Option): Option {
  if (option && typeof option === 'object' && 'label' in option && 'value' in option) {
    return option;
  }

  return { label: String(option), value: option };
}

export type SelectChangeEventHandler = (value: number | string | (number | string)[]) => void;

export interface SelectProps {
  label?: ReactNode | ReactNode[];
  placeholder?: string;
  value: number | string | (number | string)[];
  options: (number | string)[] | Option[];
  required?: boolean;
  disabled?: boolean;
  onChange: SelectChangeEventHandler;
  onOpenChange?: (open: boolean) => void;
}

const Select = forwardRef(
  (
    {
      label,
      placeholder,
      value,
      options,
      required = false,
      disabled,
      onChange,
      onOpenChange,
    }: SelectProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const { width } = useElementSize<HTMLButtonElement>(ref);

    const [open, setOpen] = useState(false);
    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        setOpen(newOpen);
        onOpenChange?.(newOpen);
      },
      [onOpenChange],
    );

    const handleChange = useCallback(
      (_event: MouseEvent | KeyboardEvent | FocusEvent | null, selectedValue: number | string) => {
        if (Array.isArray(value)) {
          const newValue = [...value];
          const index = newValue.indexOf(selectedValue);
          if (index > -1) {
            newValue.splice(index, 1);
          } else if (typeof selectedValue === 'number' || isNotEmpty(selectedValue)) {
            newValue.push(selectedValue);
          }

          onChange(newValue);
          setOpen(false);
          return;
        }

        onChange(selectedValue);
        setOpen(false);
      },
      [onChange, value],
    );

    return (
      <div className={classes.root}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <SelectUnstyled<any>
          renderValue={() => {
            return (
              <div className={classes.value}>
                <div className={classes.label}>
                  <span className={classes['label-text']}>{label ?? placeholder}</span>
                </div>
                <span className={classes.dropdown}>
                  <KeyboardArrowDownIcon className={classes['dropdown-icon']} aria-hidden="true" />
                </span>
              </div>
            );
          }}
          slotProps={{
            root: {
              ref,
              className: classes.input,
            },
            popper: {
              className: classes.popper,
              style: { width: ref ? width : 'auto' },
              disablePortal: false,
            },
          }}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          listboxOpen={open}
          onListboxOpenChange={handleOpenChange}
          data-testid="select-input"
        >
          {!Array.isArray(value) && !required ? (
            <Option value="" selectedValue={value}>
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
  },
);

Select.displayName = 'Select';

export default Select;
