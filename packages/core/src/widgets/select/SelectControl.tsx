import React, { useCallback, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import Pill from '@staticcms/core/components/common/pill/Pill';
import Select from '@staticcms/core/components/common/select/Select';
import { isNullish } from '@staticcms/core/lib/util/null.util';

import type {
  SelectField,
  SelectWidgetOptionObject,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';

function convertToOption(
  raw: string | number | SelectWidgetOptionObject | undefined,
): SelectWidgetOptionObject | undefined {
  if (typeof raw === 'string' || typeof raw === 'number') {
    return { label: `${raw}`, value: raw };
  }

  return raw;
}

const SelectControl: FC<WidgetControlProps<string | number | (string | number)[], SelectField>> = ({
  label,
  field,
  value,
  errors,
  hasErrors,
  disabled,
  forSingleList,
  isDuplicate,
  onChange,
}) => {
  const [internalRawValue, setInternalValue] = useState(value);
  const internalValue = useMemo(
    () => (isDuplicate ? value : internalRawValue),
    [internalRawValue, isDuplicate, value],
  );
  const ref = useRef<HTMLButtonElement | null>(null);

  const fieldOptions: (string | number | SelectWidgetOptionObject)[] = useMemo(
    () => field.options,
    [field.options],
  );
  const isMultiple = useMemo(() => field.multiple ?? false, [field.multiple]);

  const options = useMemo(
    () => fieldOptions.map(convertToOption).filter(Boolean) as SelectWidgetOptionObject[],
    [fieldOptions],
  );

  const optionsByValue = useMemo(
    () =>
      options.reduce((acc, option) => {
        acc[`${option.value}`] = option;
        return acc;
      }, {} as Record<string, SelectWidgetOptionObject>),
    [options],
  );

  const stringValueOptions = useMemo(
    () =>
      options.map(option => ({
        label: option.label,
        value: `${option.value}`,
      })),
    [options],
  );

  const handleChange = useCallback(
    (selectedValue: string | string[]) => {
      const isMultiple = field.multiple ?? false;
      const isEmpty =
        isMultiple && Array.isArray(selectedValue)
          ? !selectedValue?.length
          : isNullish(selectedValue);

      if (field.required && isEmpty && isMultiple) {
        setInternalValue([]);
        onChange([]);
      } else if (isEmpty) {
        setInternalValue('');
        onChange('');
      } else if (typeof selectedValue === 'string') {
        const selectedOption = optionsByValue[selectedValue];
        const optionValue = selectedOption?.value ?? '';
        setInternalValue(optionValue);
        onChange(optionValue);
      } else if (isMultiple) {
        const optionValues = selectedValue.map(v => {
          const selectedOption = optionsByValue[v];
          return selectedOption?.value ?? '';
        });
        setInternalValue(optionValues);
        onChange(optionValues);
      }
    },
    [field.multiple, field.required, onChange, optionsByValue],
  );

  const stringValue = useMemo(() => {
    if (!internalValue) {
      return isMultiple ? [] : '';
    }

    if (Array.isArray(internalValue)) {
      return internalValue.map(v => `${v}`);
    }

    return `${internalValue}`;
  }, [isMultiple, internalValue]);

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      noPadding={!hasErrors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="pointer"
    >
      <Select
        label={
          Array.isArray(stringValue) ? (
            <div className="flex wrap gap-0.5">
              {stringValue.map(selectValue => {
                const label = optionsByValue[selectValue]?.label ?? selectValue;
                return <Pill key={selectValue}>{label}</Pill>;
              })}
            </div>
          ) : (
            optionsByValue[stringValue]?.label ?? stringValue
          )
        }
        ref={ref}
        value={stringValue}
        options={stringValueOptions}
        required={field.required}
        disabled={disabled}
        onChange={handleChange}
      />
    </Field>
  );
};

export default SelectControl;
