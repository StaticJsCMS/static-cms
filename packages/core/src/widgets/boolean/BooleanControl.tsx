import React, { useCallback, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import Switch from '@staticcms/core/components/common/switch/Switch';

import type { BooleanField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const BooleanControl: FC<WidgetControlProps<boolean, BooleanField>> = ({
  value,
  label,
  errors,
  disabled,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? false);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.checked);
      onChange(event.target.checked);
    },
    [onChange],
  );

  return (
    <Field inputRef={ref} label={label} errors={errors} variant="inline" cursor="pointer">
      <Switch ref={ref} value={internalValue} disabled={disabled} onChange={handleChange} />
    </Field>
  );
};

export default BooleanControl;
