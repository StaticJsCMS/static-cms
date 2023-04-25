import { Refresh as RefreshIcon } from '@styled-icons/material/Refresh';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuid, validate } from 'uuid';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import { isEmpty, isNotEmpty } from '@staticcms/core/lib/util/string.util';

import type { UUIDField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const UUIDControl: FC<WidgetControlProps<string, UUIDField>> = ({
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
  const [internalRawValue, setInternalValue] = useState(value ?? '');
  const internalValue = useMemo(
    () => (controlled || duplicate ? value ?? '' : internalRawValue),
    [controlled, duplicate, value, internalRawValue],
  );
  const ref = useRef<HTMLInputElement | null>(null);

  const prefix = useMemo(() => field.prefix ?? '', [field.prefix]);
  const internalValueWithoutPrefix =
    isNotEmpty(prefix) && internalValue.startsWith(prefix)
      ? internalValue.replace(prefix, '')
      : internalValue;

  const handleChange = useCallback(
    (newUUID: string) => {
      setInternalValue(newUUID);
      onChange(newUUID);
    },
    [onChange],
  );

  const generateUUID = useCallback(() => {
    handleChange(`${prefix}${uuid()}`);
  }, [handleChange, prefix]);

  useEffect(() => {
    let alive = true;

    if (isEmpty(internalValueWithoutPrefix) || !validate(internalValueWithoutPrefix)) {
      setTimeout(() => {
        if (alive) {
          generateUUID();
        }
      }, 100);
    }

    return () => {
      alive = false;
    };
  }, [generateUUID, internalValueWithoutPrefix]);

  const allowRegenerate = useMemo(() => field.allow_regenerate ?? true, [field.allow_regenerate]);

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="text"
      disabled={disabled}
      endAdornment={
        allowRegenerate ? (
          <IconButton
            data-testid="generate-new-uuid"
            title="Generate new UUID"
            aria-label="generate new uuid"
            onClick={generateUUID}
            variant="text"
          >
            <RefreshIcon className="w-5 h-5" />
          </IconButton>
        ) : null
      }
    >
      <TextField type="text" inputRef={ref} value={internalValue} disabled={disabled} readonly />
    </Field>
  );
};

export default UUIDControl;
