import React, { useCallback, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import TextArea from '@staticcms/core/components/common/text-field/TextArea';

import type { StringOrTextField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const TextControl: FC<WidgetControlProps<string, StringOrTextField>> = ({
  label,
  value,
  errors,
  hasErrors,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <Field inputRef={ref} label={label} errors={errors} noPadding={!hasErrors}>
      <TextArea ref={ref} value={internalValue} onChange={handleChange} />
    </Field>
  );
};

export default TextControl;
