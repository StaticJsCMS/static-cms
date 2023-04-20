import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import formatDate from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import NowButton from './components/NowButton';
import {
  DEFAULT_DATETIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIMEZONE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from './constants';
import { localToUTC } from './utc.util';

import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import type { TextFieldProps } from '@staticcms/core/components/common/text-field/TextField';
import type { DateTimeField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

function convertMuiTextFieldProps({
  inputProps,
  disabled,
  onClick,
}: MuiTextFieldProps): TextFieldProps {
  const value: string = inputProps?.value ?? '';

  return {
    type: 'text',
    value,
    disabled,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => {},
    onClick,
  };
}

const DateTimeControl: FC<WidgetControlProps<string | Date, DateTimeField>> = ({
  field,
  label,
  value,
  disabled,
  duplicate,
  errors,
  forSingleList,
  t,
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

  const timezoneExtra = useMemo(
    () => (field.picker_utc ? '' : DEFAULT_TIMEZONE_FORMAT),
    [field.picker_utc],
  );

  const { format, dateFormat, timeFormat } = useMemo(() => {
    // dateFormat and timeFormat are strictly for modifying input field with the date/time pickers
    const dateFormat: string | boolean = field.date_format ?? true;
    // show time-picker? false hides it, true shows it using default format
    const timeFormat: string | boolean = field.time_format ?? true;

    let finalFormat = field.format;
    if (timeFormat === false) {
      finalFormat = field.format ?? DEFAULT_DATE_FORMAT;
    } else if (dateFormat === false) {
      finalFormat = field.format ?? `${DEFAULT_TIME_FORMAT}${timezoneExtra}`;
    } else {
      finalFormat = field.format ?? `${DEFAULT_DATETIME_FORMAT}${timezoneExtra}`;
    }

    return {
      format: finalFormat,
      dateFormat,
      timeFormat,
    };
  }, [field.date_format, field.format, field.time_format, timezoneExtra]);

  const inputFormat = useMemo(() => {
    if (typeof dateFormat === 'string' || typeof timeFormat === 'string') {
      const formatParts: string[] = [];
      if (typeof dateFormat === 'string' && isNotEmpty(dateFormat)) {
        formatParts.push(dateFormat);
      } else if (dateFormat !== false) {
        formatParts.push(DEFAULT_DATE_FORMAT);
      }

      if (typeof timeFormat === 'string' && isNotEmpty(timeFormat)) {
        formatParts.push(timeFormat);
      } else if (timeFormat !== false) {
        formatParts.push(`${DEFAULT_TIME_FORMAT}${timezoneExtra}`);
      }

      if (formatParts.length > 0) {
        return formatParts.join(' ');
      }
    }

    if (timeFormat === false) {
      return format ?? DEFAULT_DATE_FORMAT;
    }

    if (dateFormat === false) {
      return format ?? `${DEFAULT_TIME_FORMAT}${timezoneExtra}`;
    }

    return format ?? `${DEFAULT_DATETIME_FORMAT}${timezoneExtra}`;
  }, [dateFormat, format, timeFormat, timezoneExtra]);

  const defaultValue = useMemo(() => {
    const today = field.picker_utc ? localToUTC(new Date()) : new Date();
    return field.default === undefined
      ? format
        ? formatDate(today, format)
        : formatDate(today, DEFAULT_DATETIME_FORMAT)
      : field.default;
  }, [field.default, field.picker_utc, format]);

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

    return format ? parse(valueToParse, format, new Date()) : parseISO(valueToParse);
  }, [defaultValue, format, internalValue]);

  const handleChange = useCallback(
    (datetime: Date | null) => {
      if (datetime === null) {
        setInternalValue(defaultValue);
        onChange(defaultValue);
        return;
      }

      const adjustedValue = field.picker_utc ? localToUTC(datetime) : datetime;

      const formattedValue = formatDate(adjustedValue, format);
      setInternalValue(formattedValue);
      onChange(formattedValue);
    },
    [defaultValue, field.picker_utc, format, onChange],
  );

  const dateTimePicker = useMemo(() => {
    if (dateFormat && !timeFormat) {
      return (
        <MobileDatePicker
          key="mobile-date-picker"
          inputFormat={inputFormat}
          label={label}
          value={dateValue}
          disabled={disabled}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          renderInput={props => (
            <>
              <TextField
                key="mobile-date-input"
                data-testid="date-input"
                {...convertMuiTextFieldProps(props)}
                inputRef={ref}
                cursor="pointer"
              />
              <NowButton
                key="mobile-date-now"
                t={t}
                handleChange={v => handleChange(v)}
                disabled={disabled}
              />
            </>
          )}
        />
      );
    }

    if (!dateFormat && timeFormat) {
      return (
        <MobileTimePicker
          key="time-picker"
          label={label}
          inputFormat={inputFormat}
          value={dateValue}
          disabled={disabled}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          renderInput={props => (
            <>
              <TextField
                key="mobile-time-input"
                data-testid="time-input"
                {...convertMuiTextFieldProps(props)}
                inputRef={ref}
                cursor="pointer"
              />
              <NowButton
                key="mobile-date-now"
                t={t}
                handleChange={v => handleChange(v)}
                disabled={disabled}
              />
            </>
          )}
        />
      );
    }

    return (
      <MobileDateTimePicker
        key="mobile-date-time-picker"
        inputFormat={inputFormat}
        label={label}
        value={dateValue}
        disabled={disabled}
        onChange={handleChange}
        onOpen={handleOpen}
        onClose={handleClose}
        renderInput={props => (
          <>
            <TextField
              key="mobile-date-time-input"
              data-testid="date-time-input"
              {...convertMuiTextFieldProps(props)}
              inputRef={ref}
              cursor="pointer"
            />
            <NowButton
              key="mobile-date-now"
              t={t}
              handleChange={v => handleChange(v)}
              disabled={disabled}
            />
          </>
        )}
      />
    );
  }, [
    dateFormat,
    dateValue,
    handleChange,
    handleClose,
    handleOpen,
    inputFormat,
    disabled,
    label,
    t,
    timeFormat,
  ]);

  return (
    <Field
      inputRef={!open ? ref : undefined}
      label={label}
      errors={errors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="pointer"
      disabled={disabled}
    >
      <LocalizationProvider key="localization-provider" dateAdapter={AdapterDateFns}>
        {dateTimePicker}
      </LocalizationProvider>
    </Field>
  );
};

export default DateTimeControl;
