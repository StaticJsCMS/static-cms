import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { StringOrTextField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const classes = generateClassNames('WidgetString', ['root', 'input']);

const StringControl: FC<WidgetControlProps<string, StringOrTextField>> = ({
  value,
  label,
  errors,
  disabled,
  field,
  forSingleList,
  duplicate,
  controlled,
  onChange,
}) => {
  const rawValue = useMemo(() => value ?? '', [value]);
  const [internalRawValue, setInternalValue] = useState(rawValue);
  const internalValue = useMemo(
    () => (controlled || duplicate ? rawValue : internalRawValue),
    [controlled, duplicate, rawValue, internalRawValue],
  );
  const debouncedInternalValue = useDebounce(internalValue, 250);

  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
  }, []);

  useEffect(() => {
    if (rawValue === debouncedInternalValue) {
      return;
    }

    onChange(debouncedInternalValue);
  }, [debouncedInternalValue, onChange, rawValue]);

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="text"
      disabled={disabled}
      rootClassName={classes.root}
    >
      <TextField
        type="text"
        inputRef={ref}
        value={internalValue}
        disabled={disabled}
        onChange={handleChange}
        inputClassName={classes.input}
      />
    </Field>
  );
};

export default StringControl;
