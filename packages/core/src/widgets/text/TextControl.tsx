import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import TextArea from '@staticcms/core/components/common/text-field/TextArea';
import useDebounce from '@staticcms/core/lib/hooks/useDebounce';

import type { StringOrTextField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const TextControl: FC<WidgetControlProps<string, StringOrTextField>> = ({
  label,
  value,
  errors,
  duplicate,
  hasErrors,
  disabled,
  field,
  forSingleList,
  onChange,
}) => {
  const rawValue = useMemo(() => value ?? '', [value]);
  const [internalRawValue, setInternalValue] = useState(rawValue);
  const internalValue = useMemo(
    () => (duplicate ? rawValue : internalRawValue),
    [internalRawValue, duplicate, rawValue],
  );
  const debouncedInternalValue = useDebounce(internalValue, 200);

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
      noPadding={!hasErrors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="text"
      disabled={disabled}
    >
      <TextArea ref={ref} value={internalValue} disabled={disabled} onChange={handleChange} />
    </Field>
  );
};

export default TextControl;
