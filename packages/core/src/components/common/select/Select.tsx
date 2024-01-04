import { Select as BaseSelect } from '@mui/base/Select';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { forwardRef, useCallback, useState } from 'react';

import useElementSize from '@staticcms/core/lib/hooks/useElementSize';
import classNames from '@staticcms/core/lib/util/classNames.util';
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

export interface SelectOption {
  label: string;
  value: number | string;
}

function getOptionLabelAndValue(option: number | string | SelectOption): SelectOption {
  if (option && typeof option === 'object' && 'label' in option && 'value' in option) {
    return option;
  }

  return { label: String(option), value: option };
}

export type SelectChangeEventHandler = (
  value: number | string | (number | string)[],
  event: MouseEvent | KeyboardEvent | FocusEvent | null,
) => void;

export interface SelectProps {
  label?: ReactNode | ReactNode[];
  placeholder?: string;
  value: number | string | (number | string)[];
  options: (number | string)[] | SelectOption[];
  required?: boolean;
  disabled?: boolean;
  rootClassName?: string;
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
      rootClassName,
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
      (event: MouseEvent | KeyboardEvent | FocusEvent | null, selectedValue: number | string) => {
        if (Array.isArray(value)) {
          const newValue = [...value];
          const index = newValue.indexOf(selectedValue);
          if (index > -1) {
            newValue.splice(index, 1);
          } else if (typeof selectedValue === 'number' || isNotEmpty(selectedValue)) {
            newValue.push(selectedValue);
          }

          onChange(newValue, event);
          setOpen(false);
          return;
        }

        onChange(selectedValue, event);
        setOpen(false);
      },
      [onChange, value],
    );

    const handleClick = useCallback(
      (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        handleOpenChange(!open);
      },
      [handleOpenChange, open],
    );

    const handleClickAway = useCallback(() => {
      handleOpenChange(false);
    }, [handleOpenChange]);

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classNames(classes.root, rootClassName)}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <BaseSelect<any>
            renderValue={() => {
              return (
                <div className={classes.value}>
                  <div className={classes.label}>
                    <span className={classes['label-text']}>{label ?? placeholder}</span>
                  </div>
                  <span className={classes.dropdown}>
                    <KeyboardArrowDownIcon
                      className={classes['dropdown-icon']}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              );
            }}
            ref={ref}
            onClick={handleClick}
            slotProps={{
              root: {
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
          </BaseSelect>
        </div>
      </ClickAwayListener>
    );
  },
);

Select.displayName = 'Select';

export default Select;
