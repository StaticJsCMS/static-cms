import TodayIcon from '@mui/icons-material/Today';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import formatDate from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import React, { useCallback, useMemo, useState } from 'react';

import { isNotEmpty } from '@staticcms/core/lib/util/string.util';

import type { DateTimeField, TranslatedProps, WidgetControlProps } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

export function localToUTC(dateTime: Date, timezoneOffset: number) {
  const utcFromLocal = new Date(dateTime.getTime() - timezoneOffset);
  return utcFromLocal;
}

const StyledNowButton = styled('div')`
  width: fit-content;
`;

interface NowButtonProps {
  handleChange: (value: Date) => void;
  disabled: boolean;
}

const NowButton: FC<TranslatedProps<NowButtonProps>> = ({ t, handleChange, disabled }) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      handleChange(new Date());
    },
    [handleChange],
  );

  return (
    <StyledNowButton key="now-button-wrapper">
      <Button
        key="now-button"
        onClick={handleClick}
        disabled={disabled}
        startIcon={<TodayIcon key="today-icon" />}
        variant="outlined"
      >
        {t('editor.editorWidgets.datetime.now')}
      </Button>
    </StyledNowButton>
  );
};

const DateTimeControl: FC<WidgetControlProps<string, DateTimeField>> = ({
  field,
  label,
  value,
  t,
  isDisabled,
  onChange,
  hasErrors,
}) => {
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

    return "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
  }, [dateFormat, timeFormat]);

  const defaultValue = useMemo(() => {
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
    if (!internalValue) {
      return null;
    }

    const inputDate = field.picker_utc ? utcDate : dateValue;

    if (dateFormat && !timeFormat) {
      return (
        <MobileDatePicker
          key="mobile-date-picker"
          inputFormat={inputFormat}
          label={label}
          value={inputDate}
          onChange={handleChange}
          renderInput={params => (
            <TextField
              key="mobile-date-input"
              {...params}
              error={hasErrors}
              fullWidth
              InputProps={{
                endAdornment: (
                  <NowButton
                    key="mobile-date-now"
                    t={t}
                    handleChange={v => handleChange(v)}
                    disabled={isDisabled}
                  />
                ),
              }}
            />
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
          onChange={handleChange}
          renderInput={params => (
            <TextField
              key="time-input"
              {...params}
              error={hasErrors}
              fullWidth
              InputProps={{
                endAdornment: (
                  <NowButton
                    key="time-now"
                    t={t}
                    handleChange={v => handleChange(v)}
                    disabled={isDisabled}
                  />
                ),
              }}
            />
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
        onChange={handleChange}
        renderInput={params => (
          <TextField
            key="mobile-date-time-input"
            {...params}
            error={hasErrors}
            fullWidth
            InputProps={{
              endAdornment: (
                <NowButton
                  key="mobile-date-time-now"
                  t={t}
                  handleChange={v => handleChange(v)}
                  disabled={isDisabled}
                />
              ),
            }}
          />
        )}
      />
    );
  }, [
    dateFormat,
    dateValue,
    field.picker_utc,
    handleChange,
    hasErrors,
    inputFormat,
    internalValue,
    isDisabled,
    label,
    t,
    timeFormat,
    utcDate,
  ]);

  return (
    <LocalizationProvider key="localization-provider" dateAdapter={AdapterDateFns}>
      {dateTimePicker}
    </LocalizationProvider>
  );
};

export default DateTimeControl;
