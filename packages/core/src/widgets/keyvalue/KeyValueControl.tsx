import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import IconButton from '@staticcms/core/components/common/button/IconButton';
import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import useDebouncedCallback from '@staticcms/core/lib/hooks/useDebouncedCallback';
import { createEmptyPair } from './util';

import type { KeyValueField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC, MouseEvent } from 'react';
import type { Pair } from './types';

const StringControl: FC<WidgetControlProps<Pair[], KeyValueField>> = ({
  value,
  label,
  errors,
  disabled,
  field,
  forSingleList,
  duplicate,
  controlled,
  onChange,
  t,
}) => {
  const labelSingular = useMemo(
    () => (field.label_singular ? field.label_singular : field.label ?? field.name),
    [field.label, field.label_singular, field.name],
  );
  const keyLabel = useMemo(
    () => field.key_label ?? t('editor.editorWidgets.keyvalue.key'),
    [field.key_label, t],
  );
  const valueLabel = useMemo(
    () => field.value_label ?? t('editor.editorWidgets.keyvalue.value'),
    [field.value_label, t],
  );

  const rawValue: Pair[] = useMemo(() => (value ? value : [createEmptyPair()]), [value]);

  const [internalRawValue, setInternalValue] = useState(rawValue);

  const internalValue = useMemo(
    () => (controlled || duplicate ? rawValue : internalRawValue),
    [controlled, duplicate, rawValue, internalRawValue],
  );

  const ref = useRef<HTMLInputElement | null>(null);

  const debouncedOnChanged = useDebouncedCallback(onChange, 250);

  const updateInternalValue = useCallback(
    (newInternalValue: Pair[]) => {
      setInternalValue(newInternalValue);

      debouncedOnChanged(newInternalValue);
    },
    [debouncedOnChanged],
  );

  const handleChange = useCallback(
    (index: number, target: 'key' | 'value') => (event: ChangeEvent<HTMLInputElement>) => {
      const newInternalValue = [...internalValue];
      newInternalValue[index] = {
        ...newInternalValue[index],
        [target]: event.target.value,
      };

      updateInternalValue(newInternalValue);
    },
    [internalValue, updateInternalValue],
  );

  const handleAdd = useCallback(() => {
    const newInternalValue = [...internalValue];
    newInternalValue.push(createEmptyPair());
    updateInternalValue(newInternalValue);
  }, [internalValue, updateInternalValue]);

  const handleRemove = useCallback(
    (index: number) => () => {
      const newInternalValue = [...internalValue];
      newInternalValue.splice(index, 1);
      updateInternalValue(newInternalValue);
    },
    [internalValue, updateInternalValue],
  );

  const clickNoOp = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

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
      <div className="flex gap-2 px-3 mt-2 w-full">
        <div className="w-full text-sm">{keyLabel}</div>
        <div className="w-full text-sm">{valueLabel}</div>
        <div className="flex">
          <div className="w-[24px]"></div>
        </div>
      </div>
      {internalValue.map((pair, index) => (
        <div key={`keyvalue-${index}`} className="flex gap-2 px-3 mt-2 w-full items-center">
          <TextField
            type="text"
            data-testid={`key-${index}`}
            inputRef={index === 0 ? ref : undefined}
            value={pair.key}
            disabled={disabled}
            onChange={handleChange(index, 'key')}
            onClick={clickNoOp}
            variant="contained"
          />
          <TextField
            type="text"
            data-testid={`value-${index}`}
            value={pair.value}
            disabled={disabled}
            onChange={handleChange(index, 'value')}
            onClick={clickNoOp}
            variant="contained"
          />
          <IconButton
            data-testid={`remove-button-${index}`}
            size="small"
            variant="text"
            onClick={handleRemove(index)}
            disabled={disabled}
            className="
              h-6
              w-6
            "
          >
            <CloseIcon
              className="
                h-5
                w-5
              "
            />
          </IconButton>
        </div>
      ))}
      <div className="px-3 mt-3">
        <Button
          variant="outlined"
          onClick={handleAdd}
          className="w-full"
          data-testid="key-value-add"
          disabled={disabled}
        >
          {t('editor.editorWidgets.list.add', { item: labelSingular })}
        </Button>
      </div>
    </Field>
  );
};

export default StringControl;
