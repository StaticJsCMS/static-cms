import React, { useCallback, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import Switch from '@staticcms/core/components/common/switch/Switch';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { BooleanField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';

const classes = generateClassNames('WidgetBoolean', [
  'root',
  'error',
  'required',
  'disabled',
  'for-single-list',
  'input',
]);

const BooleanControl: FC<WidgetControlProps<boolean, BooleanField>> = ({
  value,
  label,
  errors,
  hasErrors,
  disabled,
  field,
  forSingleList,
  duplicate,
  onChange,
}) => {
  const [internalRawValue, setInternalValue] = useState(value ?? false);
  const internalValue = useMemo(
    () => (duplicate ? value ?? false : internalRawValue),
    [internalRawValue, duplicate, value],
  );
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.checked);
      onChange(event.target.checked);
    },
    [onChange],
  );

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      variant="inline"
      cursor="pointer"
      hint={field.hint}
      forSingleList={forSingleList}
      disabled={disabled}
      rootClassName={classNames(
        classes.root,
        disabled && classes.disabled,
        field.required !== false && classes.required,
        hasErrors && classes.error,
        forSingleList && classes['for-single-list'],
      )}
    >
      <Switch
        ref={ref}
        value={internalValue}
        disabled={disabled}
        onChange={handleChange}
        rootClassName={classes.input}
      />
    </Field>
  );
};

export default BooleanControl;
