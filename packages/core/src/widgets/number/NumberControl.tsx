import React, { useCallback, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { NumberField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const classes = generateClassNames('WidgetNumberPreview', [
  'root',
  'error',
  'required',
  'disabled',
  'for-single-list',
  'input',
]);

const NumberControl: FC<WidgetControlProps<string | number, NumberField>> = ({
  field,
  value,
  label,
  errors,
  hasErrors,
  disabled,
  forSingleList,
  duplicate,
  onChange,
}) => {
  const [internalRawValue, setInternalValue] = useState(value ?? '');
  const internalValue = useMemo(
    () => (duplicate ? value ?? '' : internalRawValue),
    [internalRawValue, duplicate, value],
  );
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const valueType = field.value_type;
      let newValue: string | number = e.target.value;
      if (valueType === 'float') {
        newValue = parseFloat(e.target.value);
      } else if (valueType === 'int') {
        newValue = parseInt(e.target.value, 10);
      }

      if (typeof newValue !== 'string' && isNaN(newValue)) {
        newValue = '';
      }
      onChange(newValue);
      setInternalValue(newValue);
    },
    [field, onChange],
  );

  const min = useMemo(() => field.min ?? '', [field.min]);
  const max = useMemo(() => field.max ?? '', [field.max]);
  const step = useMemo(() => {
    if (field.step) {
      if (field.value_type === 'int') {
        return Math.round(field.step);
      }

      return field.step;
    }

    return 1;
  }, [field.step, field.value_type]);

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="text"
      disabled={disabled}
      rootClassName={classNames(
        classes.root,
        disabled && classes.disabled,
        field.required !== false && classes.required,
        hasErrors && classes.error,
        forSingleList && classes['for-single-list'],
      )}
    >
      <TextField
        type="number"
        inputRef={ref}
        value={internalValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
        inputClassName={classes.input}
      />
    </Field>
  );
};

export default NumberControl;
