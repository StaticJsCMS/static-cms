import React, { useCallback, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import TextArea from '@staticcms/core/components/common/text-field/TextArea';

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
  const [internalRawValue, setInternalValue] = useState(value ?? '');
  const internalValue = useMemo(
    () => (duplicate ? value ?? '' : internalRawValue),
    [internalRawValue, duplicate, value],
  );
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange],
  );

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
