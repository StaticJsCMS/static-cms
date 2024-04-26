import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { formatDate } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { parseISO } from 'date-fns/parseISO';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import NowButton from './components/NowButton';
import { DEFAULT_DATETIME_FORMAT } from './constants';
import { getDateFnsLocale, useDatetimeFormats } from './datetime.util';
import { localToUTC } from './utc.util';

import type { DateTimeField, WidgetControlProps } from '@staticcms/core';
import type { FC } from 'react';

import './DateTimeControl.css';

export const classes = generateClassNames('WidgetDateTime', [
  'root',
  'error',
  'required',
  'disabled',
  'for-single-list',
  'wrapper',
  'inputs',
  'input-wrapper',
  'input',
]);

const DateTimeControl: FC<WidgetControlProps<string | Date, DateTimeField>> = ({
  field,
  label,
  value,
  disabled,
  duplicate,
  errors,
  hasErrors,
  forSingleList,
  config: { locale },
  onChange,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const { storageFormat, dateFormat, timeFormat, displayFormat } = useDatetimeFormats(field);

  const defaultValue = useMemo(() => {
    const today = field.picker_utc ? localToUTC(new Date()) : new Date();
    return field.default === undefined
      ? storageFormat
        ? formatDate(today, storageFormat)
        : formatDate(today, DEFAULT_DATETIME_FORMAT)
      : field.default;
  }, [field.default, field.picker_utc, storageFormat]);

  const [internalRawValue, setInternalValue] = useState(value);
  const internalValue = useMemo(
    () => (duplicate ? value : internalRawValue),
    [internalRawValue, duplicate, value],
  );

  const dateValue: Date = useMemo(() => {
    let valueToParse = internalValue;
    if (!valueToParse) {
      valueToParse = defaultValue;
    }

    if (typeof valueToParse !== 'string') {
      return valueToParse;
    }

    if (storageFormat) {
      const parsed = parse(valueToParse, storageFormat, new Date());
      // if parsing fails, Invalid Date (NaN) will be returned: fallback to parseISO
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return parseISO(valueToParse);
  }, [defaultValue, storageFormat, internalValue]);

  const handleChange = useCallback(
    (datetime: Date | null) => {
      if (datetime === null || isNaN(datetime.getTime())) {
        setInternalValue(defaultValue);
        onChange(defaultValue);
        return;
      }

      const adjustedValue = field.picker_utc ? localToUTC(datetime) : datetime;

      const formattedValue = formatDate(adjustedValue, storageFormat);
      setInternalValue(formattedValue);
      onChange(formattedValue);
    },
    [defaultValue, field.picker_utc, storageFormat, onChange],
  );

  const inputRef = useRef<HTMLInputElement>();
  const rootRef = useForkRef(ref, inputRef);

  const dateTimePicker = useMemo(() => {
    if (dateFormat && !timeFormat) {
      return (
        <DatePicker
          key="date-picker"
          format={displayFormat}
          value={dateValue}
          disabled={disabled}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          className={classes['input-wrapper']}
          inputRef={rootRef}
          slotProps={{
            textField: {
              inputProps: {
                'data-testid': 'date-input',
                className: classes.input,
              },
            },
          }}
        />
      );
    }

    if (!dateFormat && timeFormat) {
      return (
        <TimePicker
          key="time-picker"
          format={displayFormat}
          value={dateValue}
          disabled={disabled}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          className={classes['input-wrapper']}
          inputRef={rootRef}
          slotProps={{
            textField: {
              inputProps: {
                'data-testid': 'time-input',
                className: classes.input,
              },
            },
          }}
        />
      );
    }

    return (
      <DateTimePicker
        key="date-time-picker"
        format={displayFormat}
        value={dateValue}
        disabled={disabled}
        onChange={handleChange}
        onOpen={handleOpen}
        onClose={handleClose}
        className={classes['input-wrapper']}
        inputRef={rootRef}
        slotProps={{
          textField: {
            inputProps: {
              'data-testid': 'date-time-input',
              className: classes.input,
            },
          },
        }}
      />
    );
  }, [
    dateFormat,
    timeFormat,
    displayFormat,
    dateValue,
    disabled,
    handleChange,
    handleOpen,
    handleClose,
    rootRef,
  ]);

  const dateLocale = useMemo(() => (locale ? getDateFnsLocale(locale) : undefined), [locale]);

  return (
    <Field
      inputRef={!open ? ref : undefined}
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
      wrapperClassName={classes.wrapper}
    >
      <div className={classes['inputs']}>
        <LocalizationProvider
          key="localization-provider"
          dateAdapter={AdapterDateFns}
          adapterLocale={dateLocale}
        >
          {dateTimePicker}
        </LocalizationProvider>
        <NowButton
          key="date-now"
          field={field}
          handleChange={v => handleChange(v)}
          disabled={disabled}
        />
      </div>
    </Field>
  );
};

export default DateTimeControl;
