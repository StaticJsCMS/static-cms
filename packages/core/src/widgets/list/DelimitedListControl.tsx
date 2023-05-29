import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import useDebounce from '@staticcms/core/lib/hooks/useDebounce';

import type { ListField, ValueOrNestedValue, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const DelimitedListControl: FC<WidgetControlProps<ValueOrNestedValue[], ListField>> = ({
  field,
  label,
  disabled,
  duplicate,
  value,
  errors,
  forSingleList,
  controlled,
  onChange,
}) => {
  const delimiter = useMemo(() => field.delimiter ?? ',', [field.delimiter]);

  const rawValue = useMemo(() => (value ?? []).join(delimiter), [delimiter, value]);

  const [internalRawValue, setInternalValue] = useState(rawValue);
  const internalValue = useMemo(
    () => (controlled || duplicate ? rawValue : internalRawValue),
    [controlled, duplicate, rawValue, internalRawValue],
  );
  const debouncedInternalValue = useDebounce(internalValue, 200);

  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newRawValue = event.target.value;
    setInternalValue(newRawValue);
  }, []);

  useEffect(() => {
    if (rawValue === debouncedInternalValue) {
      return;
    }

    const newValue = debouncedInternalValue.split(delimiter).map(v => v.trim());
    onChange(newValue);
  }, [debouncedInternalValue, delimiter, onChange, rawValue]);

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="text"
      disabled={disabled}
    >
      <TextField
        type="text"
        inputRef={ref}
        value={internalValue}
        disabled={disabled}
        onChange={handleChange}
      />
    </Field>
  );
};

export default DelimitedListControl;
