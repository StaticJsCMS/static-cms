import formatDate from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import Button from '@staticcms/core/components/common/button/Button';
import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';

import type { DateTimeField, TranslatedProps, WidgetControlProps } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import type { TextFieldProps } from '@staticcms/core/components/common/text-field/TextField';

export function localToUTC(dateTime: Date, timezoneOffset: number) {
  const utcFromLocal = new Date(dateTime.getTime() - timezoneOffset);
  return utcFromLocal;
}

function convertMuiTextFieldProps(
  { inputProps, onClick }: MuiTextFieldProps,
  ref: React.MutableRefObject<HTMLInputElement | null>,
): TextFieldProps & {
  ref: React.MutableRefObject<HTMLInputElement | null>;
} {
  const value: string = inputProps?.value ?? '';

  return {
    ref,
    type: 'text',
    value,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => {},
    onClick,
  };
}

interface NowButtonProps {
  handleChange: (value: Date) => void;
  disabled: boolean;
}

const NowButton: FC<TranslatedProps<NowButtonProps>> = ({ disabled, t, handleChange }) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      handleChange(new Date());
    },
    [handleChange],
  );

  return (
    <div
      key="now-button-wrapper"
      className="absolute inset-y-1 right-3 flex items-center
    "
    >
      <Button
        key="now-button"
        data-testid="datetime-now"
        onClick={handleClick}
        disabled={disabled}
        variant="outlined"
      >
        {t('editor.editorWidgets.datetime.now')}
      </Button>
    </div>
  );
};

const DateTimeControl: FC<WidgetControlProps<string, DateTimeField>> = ({
  field,
  label,
  value,
  t,
  isDisabled,
  errors,
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

  const { format, dateFormat, timeFormat } = useMemo(() => {
    const format = field.format;

    // dateFormat and timeFormat are strictly for modifying input field with the date/time pickers
    const dateFormat: string | boolean = field.date_format ?? true;
    // show time-picker? false hides it, true shows it using default format
    const timeFormat: string | boolean = field.time_format ?? true;

    return {
      format,
      dateFormat,
      timeFormat,
    };
  }, [field.date_format, field.format, field.time_format]);

  const timezoneOffset = useMemo(() => new Date().getTimezoneOffset() * 60000, []);

  const inputFormat = useMemo(() => {
    if (typeof dateFormat === 'string' || typeof timeFormat === 'string') {
      const formatParts: string[] = [];
      if (typeof dateFormat === 'string' && isNotEmpty(dateFormat)) {
        formatParts.push(dateFormat);
      }

      if (typeof timeFormat === 'string' && isNotEmpty(timeFormat)) {
        formatParts.push(timeFormat);
      }

      if (formatParts.length > 0) {
        return formatParts.join(' ');
      }
    }

    if (timeFormat === false) {
      return 'yyyy-MM-dd';
    }

    if (dateFormat === false) {
      return 'HH:mm:ss.SSSXXX';
    }

    return "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
  }, [dateFormat, timeFormat]);

  const defaultValue = useMemo(() => {
    console.log(
      'utc',
      localToUTC(new Date(), timezoneOffset).toISOString(),
      'utc alt',
      new Date(new Date().getTime() + timezoneOffset).toISOString(),
      'timezoneOffset',
      timezoneOffset,
      'date',
      new Date().toISOString(),
    );
    const today = field.picker_utc ? localToUTC(new Date(), timezoneOffset) : new Date();
    return field.default === undefined
      ? format
        ? formatDate(today, format)
        : formatDate(today, inputFormat)
      : field.default;
  }, [field.default, field.picker_utc, format, inputFormat, timezoneOffset]);

  const [internalValue, setInternalValue] = useState(value);

  const dateValue: Date = useMemo(() => {
    let valueToParse = internalValue;
    if (!valueToParse) {
      valueToParse = defaultValue;
    }

    return format ? parse(valueToParse, format, new Date()) : parseISO(valueToParse);
  }, [defaultValue, format, internalValue]);

  const utcDate = useMemo(() => {
    const dateTime = new Date(dateValue);
    const utcFromLocal = new Date(dateTime.getTime() + timezoneOffset) ?? defaultValue;
    return utcFromLocal;
  }, [dateValue, defaultValue, timezoneOffset]);

  const handleChange = useCallback(
    (datetime: Date | null) => {
      if (datetime === null) {
        setInternalValue(defaultValue);
        onChange(defaultValue);
        return;
      }

      const adjustedValue = field.picker_utc ? localToUTC(datetime, timezoneOffset) : datetime;

      let formattedValue: string;
      if (format) {
        formattedValue = formatDate(adjustedValue, format);
      } else {
        formattedValue = formatISO(adjustedValue);
      }
      setInternalValue(formattedValue);
      onChange(formattedValue);
    },
    [defaultValue, field.picker_utc, format, onChange, timezoneOffset],
  );

  const dateTimePicker = useMemo(() => {
    const inputDate = field.picker_utc ? utcDate : dateValue;

    if (dateFormat && !timeFormat) {
      return (
        <MobileDatePicker
          key="mobile-date-picker"
          inputFormat={inputFormat}
          label={label}
          value={inputDate}
          disabled={isDisabled}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          renderInput={props => (
            <>
              <TextField
                key="mobile-date-input"
                data-testId="date-input"
                {...convertMuiTextFieldProps(props, ref)}
              />
              <NowButton
                key="mobile-date-now"
                t={t}
                handleChange={v => handleChange(v)}
                disabled={isDisabled}
              />
            </>
          )}
        />
      );
    }

    if (!dateFormat && timeFormat) {
      return (
        <TimePicker
          key="time-picker"
          label={label}
          inputFormat={inputFormat}
          value={inputDate}
          disabled={isDisabled}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          renderInput={props => (
            <>
              <TextField
                key="mobile-time-input"
                data-testId="time-input"
                {...convertMuiTextFieldProps(props, ref)}
              />
              <NowButton
                key="mobile-date-now"
                t={t}
                handleChange={v => handleChange(v)}
                disabled={isDisabled}
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
        value={inputDate}
        disabled={isDisabled}
        onChange={handleChange}
        onOpen={handleOpen}
        onClose={handleClose}
        renderInput={props => (
          <>
            <TextField
              key="mobile-date-time-input"
              data-testId="date-time-input"
              {...convertMuiTextFieldProps(props, ref)}
            />
            <NowButton
              key="mobile-date-now"
              t={t}
              handleChange={v => handleChange(v)}
              disabled={isDisabled}
            />
          </>
        )}
      />
    );
  }, [
    dateFormat,
    dateValue,
    field.picker_utc,
    handleChange,
    handleClose,
    handleOpen,
    inputFormat,
    isDisabled,
    label,
    t,
    timeFormat,
    utcDate,
  ]);

  return (
    <Field inputRef={!open ? ref : undefined} label={label} errors={errors}>
      <LocalizationProvider key="localization-provider" dateAdapter={AdapterDateFns}>
        {dateTimePicker}
      </LocalizationProvider>
    </Field>
  );
};

export default DateTimeControl;
