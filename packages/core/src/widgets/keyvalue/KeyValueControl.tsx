import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import IconButton from '@staticcms/core/components/common/button/IconButton';
import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import useDebouncedCallback from '@staticcms/core/lib/hooks/useDebouncedCallback';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { createEmptyPair } from './util';

import type { KeyValueField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC, MouseEvent } from 'react';
import type { Pair } from './types';

import './KeyValueControl.css';

const classes = generateClassNames('WidgetKeyValue', [
  'root',
  'error',
  'required',
  'disabled',
  'for-single-list',
  'header',
  'header-cell',
  'header-action-cell',
  'header-action-cell-content',
  'row',
  'delete-button',
  'delete-button-icon',
  'actions',
  'add-button',
]);

const StringControl: FC<WidgetControlProps<Pair[], KeyValueField>> = ({
  value,
  label,
  errors,
  hasErrors,
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
      rootClassName={classNames(
        classes.root,
        disabled && classes.disabled,
        field.required !== false && classes.required,
        hasErrors && classes.error,
        forSingleList && classes['for-single-list'],
      )}
    >
      <div className={classes.header}>
        <div className={classes['header-cell']}>{keyLabel}</div>
        <div className={classes['header-cell']}>{valueLabel}</div>
        <div className={classes['header-action-cell']}>
          <div className={classes['header-action-cell-content']}></div>
        </div>
      </div>
      {internalValue.map((pair, index) => (
        <div key={`keyvalue-${index}`} className={classes.row}>
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
            className={classes['delete-button']}
          >
            <CloseIcon className={classes['delete-button-icon']} />
          </IconButton>
        </div>
      ))}
      <div className={classes.actions}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleAdd}
          className={classes['add-button']}
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
