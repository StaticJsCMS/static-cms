import ChevronUpDownIcon from '@heroicons/react/20/solid/ChevronUpDownIcon';
import SelectUnstyled from '@mui/base/SelectUnstyled';
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
  label: ReactNode | ReactNode[];
  value: T | T[] | null;
  options: T[] | Option<T>[];
  required?: boolean;
  disabled?: boolean;
  onChange: SelectChangeEventHandler<T>;
}

const Select = function <T>(
  { label, value, options, required = false, disabled, onChange }: SelectProps<T>,
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
              {label}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
              mt-1
              max-h-60
              w-full
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
              z-40
            `,
          },
        }}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      >
        {!Array.isArray(value) && !required ? (
          <Option value={null} selectedValue={value}>
            <i>None</i>
          </Option>
        ) : null}
        {options.map((option, index) => {
          const { label: optionLabel, value: optionValue } = getOptionLabelAndValue(option);

          return (
            <Option key={index} value={optionValue} selectedValue={value}>
              {optionLabel}
            </Option>
          );
        })}
      </SelectUnstyled>
      {/* <Listbox value={value} onChange={handleChange} disabled={disabled}>
        <Listbox.Button
          ref={ref}
          className={classNames(
            `
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
            buttonClassName,
          )}
          data-testid="select-input"
        >
          {label}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            data-testid="select-options"
            className={classNames(
              `
                absolute
                mt-1
                max-h-60
                w-full
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
                z-40
              `,
              optionsClassName,
            )}
          >
            {!Array.isArray(value) && !required ? (
              <Listbox.Option
                key="none"
                data-testid={`select-option-none`}
                className={classNames(
                  `
                    relative
                    select-none
                    py-2
                    pl-10
                    pr-4
                    cursor-pointer
                    text-gray-900
                  `,
                  optionClassName,
                )}
                value={null}
              >
                <span className="block truncate font-normal">
                  <i>None</i>
                </span>
              </Listbox.Option>
            ) : null}
            {options.map((option, index) => {
              const { label: optionLabel, value: optionValue } = getOptionLabelAndValue(option);

              const selected = Array.isArray(value)
                ? value.includes(optionValue)
                : value === optionValue;

              return (
                <Listbox.Option
                  key={index}
                  data-testid={`select-option-${optionValue}`}
                  className={classNames(
                    `
                      relative
                      select-none
                      py-2
                      pl-10
                      pr-4
                      cursor-pointer
                    `,
                    selected ? 'bg-gray-100 text-gray-900' : 'text-gray-900',
                    optionClassName,
                  )}
                  value={optionValue}
                >
                  <span
                    className={classNames(
                      'block truncate',
                      selected ? 'font-medium' : 'font-normal',
                    )}
                  >
                    {optionLabel}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </Listbox> */}
    </div>
  );
};

export default forwardRef(Select) as <T>(
  props: SelectProps<T> & { ref?: Ref<HTMLButtonElement> },
) => JSX.Element;
