import { Combobox, Transition } from '@headlessui/react';
import { Check as CheckIcon } from '@styled-icons/material/Check';
import { Close as CloseIcon } from '@styled-icons/material/Close';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { Fragment, forwardRef, useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import IconButton from '../button/IconButton';

import type { ReactNode, Ref } from 'react';

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

export type AutocompleteChangeEventHandler<T> = (value: T | T[]) => void;

export interface AutocompleteProps<T> {
  label: ReactNode | ReactNode[];
  value: T | T[] | null;
  options: T[] | Option<T>[];
  disabled?: boolean;
  required?: boolean;
  displayValue: (item: T | T[] | null) => string;
  onQuery: (query: string) => void;
  onChange: (value: T | T[] | undefined) => void;
}

const Autocomplete = function <T>(
  {
    label,
    value,
    options,
    disabled,
    required,
    displayValue,
    onQuery,
    onChange,
  }: AutocompleteProps<T>,
  ref: Ref<HTMLInputElement>,
) {
  const handleChange = useCallback(
    (selectedValue: T) => {
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

  const clear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  return (
    <div className="relative w-full">
      <Combobox value={value} onChange={handleChange} disabled={disabled}>
        <div className="relative mt-1">
          <div
            className="
              flex
              flex-col
              flex-start
              text-sm
              font-medium
              relative
              min-h-8
              p-0
              w-full
              text-gray-800
              dark:text-gray-100
            "
            data-testid="autocomplete-input-wrapper"
          >
            {label}
            <Combobox.Input<'input', T | T[] | null>
              ref={ref}
              className={classNames(
                `
                  w-full
                  bg-transparent
                  border-none
                  py-2
                  pl-3
                  pr-10
                  text-sm
                  leading-5
                  focus:ring-0
                  outline-none
                  flex-grow
                  truncate
                `,
                disabled
                  ? `
                      text-gray-300
                      dark:text-gray-500
                    `
                  : `
                      text-gray-800
                      dark:text-gray-100
                    `,
              )}
              data-testid="autocomplete-input"
              displayValue={displayValue}
              onChange={event => onQuery(event.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
              <Combobox.Button>
                <KeyboardArrowDownIcon
                  className={classNames(
                    `
                      h-5
                      w-5
                      text-gray-400
                    `,
                    disabled &&
                      `
                        text-gray-300/75
                        dark:text-gray-600/75
                      `,
                  )}
                  aria-hidden="true"
                />
              </Combobox.Button>
              {!required && !Array.isArray(value) ? (
                <IconButton variant="text" disabled={disabled} onClick={clear}>
                  <CloseIcon
                    className={classNames(
                      `
                        h-5
                        w-5
                        text-gray-400
                      `,
                      disabled &&
                        `
                          text-gray-300/75
                          dark:text-gray-600/75
                        `,
                    )}
                    aria-hidden="true"
                  />
                </IconButton>
              ) : null}
            </div>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => onQuery('')}
          >
            <Combobox.Options
              data-testid="autocomplete-options"
              className={`
                absolute
                mt-1
                max-h-60
                w-full
                overflow-auto
                rounded-md
                bg-white
                py-1
                text-base
                shadow-md
                ring-1
                ring-black
                ring-opacity-5
                focus:outline-none
                sm:text-sm
                z-30
                dark:bg-slate-700
                dark:shadow-lg
              `}
            >
              {options.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-800 dark:text-gray-300">
                  Nothing found.
                </div>
              ) : (
                options.map((option, index) => {
                  const { label: optionLabel, value: optionValue } = getOptionLabelAndValue(option);

                  const selected = Array.isArray(value)
                    ? value.includes(optionValue)
                    : value === optionValue;

                  return (
                    <Combobox.Option
                      key={index}
                      data-testid={`autocomplete-option-${optionValue}`}
                      className={({ active }) =>
                        classNames(
                          `
                            relative
                            select-none
                            py-2
                            pl-10
                            pr-4
                            cursor-pointer
                            text-gray-800
                            dark:text-gray-100
                          `,
                          (selected || active) &&
                            `
                             bg-gray-100
                             dark:bg-slate-600
                            `,
                        )
                      }
                      value={optionValue}
                    >
                      <span
                        className={classNames(
                          `
                            block
                          `,
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
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default forwardRef(Autocomplete) as <T>(
  props: AutocompleteProps<T> & { ref: Ref<HTMLButtonElement> },
) => JSX.Element;
