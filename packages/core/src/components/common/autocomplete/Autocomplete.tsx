import { Popper } from '@mui/base/Popper';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { Check as CheckIcon } from '@styled-icons/material/Check';
import { Close as CloseIcon } from '@styled-icons/material/Close';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@styled-icons/material/KeyboardArrowDown';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import useDebouncedCallback from '@staticcms/core/lib/hooks/useDebouncedCallback';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { isNullish } from '@staticcms/core/lib/util/null.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import IconButton from '../button/IconButton';

import type { MouseEvent, ReactNode, Ref } from 'react';

import './Autocomplete.css';

export const classes = generateClassNames('Autocomplete', [
  'root',
  'focused',
  'disabled',
  'input',
  'button-wrapper',
  'button',
  'button-icon',
  'options',
  'nothing',
  'option',
  'option-selected',
  'option-label',
  'checkmark',
  'checkmark-icon',
]);

export interface Option {
  label: string;
  value: string;
}

function getOptionLabelAndValue(option: string | Option): Option {
  if (option && typeof option === 'object' && 'label' in option && 'value' in option) {
    return option;
  }

  return { label: option, value: option };
}

export type AutocompleteChangeEventHandler = (value: string | string[]) => void;

export interface AutocompleteProps {
  label: ReactNode | ReactNode[];
  value: string | string[] | null;
  options: string[] | Option[];
  disabled?: boolean;
  required?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  displayValue: (item: string | string[] | null) => string;
  onQuery: (query: string) => void;
  onChange: (value: string | string[] | undefined) => void;
}

const Autocomplete = ({
  label,
  value,
  options,
  inputRef,
  disabled,
  required,
  onChange,
  onQuery,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedOnQuery = useDebouncedCallback(onQuery, 200);

  const handleInputChange = useCallback(
    (newInputValue: string) => {
      setInputValue(newInputValue);
      debouncedOnQuery(newInputValue);
    },
    [debouncedOnQuery],
  );

  const handleChange = useCallback(
    (selectedValue: Option | readonly Option[] | null) => {
      if (selectedValue === null) {
        if (Array.isArray(value)) {
          onChange([]);
          return;
        }

        onChange(undefined);
        return;
      }

      if ('value' in selectedValue) {
        onChange(selectedValue.value);
        return;
      }

      onChange(selectedValue.map(option => option.value));
    },
    [onChange, value],
  );

  const clear = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onChange(Array.isArray(value) ? [] : undefined);
      setInputValue('');
      debouncedOnQuery('');
    },
    [debouncedOnQuery, onChange, value],
  );

  const finalOptions = useMemo(() => options.map(getOptionLabelAndValue), [options]);
  const optionsByValue = useMemo(
    () =>
      finalOptions.reduce((acc, option) => {
        acc[option.value] = option;

        return acc;
      }, {} as Record<string, Option>),
    [finalOptions],
  );

  const finalValue = useMemo(() => {
    if (isNullish(value)) {
      return value;
    }

    if (typeof value === 'string') {
      return optionsByValue[value];
    }

    return value.map(v => optionsByValue[v]).filter(v => Boolean(v));
  }, [optionsByValue, value]);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    popupOpen,
    anchorEl,
    setAnchorEl,
  } = useAutocomplete({
    options: finalOptions,
    value: finalValue,
    inputValue,
    multiple: Array.isArray(value),
    disabled,
    openOnFocus: true,
    onChange: (_event, selectedValue) => handleChange(selectedValue),
    onInputChange: (_event, newQueryInput) => handleInputChange(newQueryInput),
    filterOptions: options => options,
    clearOnBlur: false,
    clearOnEscape: false,
  });

  const ref = useRef<HTMLDivElement>();
  const rootRef = useForkRef(ref, setAnchorEl);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localInputRef = (getInputProps() as any)
    .ref as React.MutableRefObject<HTMLInputElement | null>;
  const finalInputRef = useForkRef(localInputRef, inputRef);
  const handleDropdownButtonClick = useCallback(() => {
    localInputRef.current?.blur();
    localInputRef.current?.click();
  }, [localInputRef]);

  const width = anchorEl?.clientWidth;

  return (
    <React.Fragment>
      <div
        {...getRootProps()}
        ref={rootRef}
        className={classNames(
          classes.root,
          focused && classes.focused,
          disabled && classes.disabled,
        )}
        data-testid="autocomplete"
      >
        {label}
        <input
          {...getInputProps()}
          ref={finalInputRef}
          className={classes.input}
          data-testid="autocomplete-input"
        />
        <div className={classes['button-wrapper']}>
          <IconButton
            variant="text"
            size="small"
            disabled={disabled}
            className={classes.button}
            onClick={handleDropdownButtonClick}
            aria-label="open options"
          >
            <KeyboardArrowDownIcon className={classes['button-icon']} aria-hidden="true" />
          </IconButton>
          {!required ? (
            <IconButton
              variant="text"
              size="small"
              disabled={disabled}
              className={classes.button}
              onClick={clear}
              aria-label="clear"
            >
              <CloseIcon className={classes['button-icon']} aria-hidden="true" />
            </IconButton>
          ) : null}
        </div>
      </div>
      {anchorEl && (
        <Popper open={popupOpen} anchorEl={anchorEl} style={{ width }}>
          <ul
            {...getListboxProps()}
            className={classNames(classes.options, 'CMS_Scrollbar_root', 'CMS_Scrollbar_secondary')}
          >
            {groupedOptions.length > 0 ? (
              groupedOptions.map((option, index) => {
                const { label: optionLabel, value: optionValue } = getOptionLabelAndValue(
                  option as Option,
                );

                const selected = Array.isArray(value)
                  ? value.includes(optionValue)
                  : value === optionValue;

                return (
                  <li
                    key={index}
                    {...getOptionProps({ option: option as Option, index })}
                    className={classNames(classes.option, selected && classes['option-selected'])}
                    data-testid={`autocomplete-option-${optionValue}`}
                  >
                    <span className={classes['option-label']}>{optionLabel}</span>
                    {selected ? (
                      <span className={classes.checkmark}>
                        <CheckIcon className={classes['checkmark-icon']} aria-hidden="true" />
                      </span>
                    ) : null}
                  </li>
                );
              })
            ) : (
              <div className={classes.nothing}>Nothing found.</div>
            )}
          </ul>
        </Popper>
      )}
    </React.Fragment>
  );
};

export default Autocomplete;
