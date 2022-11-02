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
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import type { MouseEvent } from 'react';
import type { DateTimeField, TranslatedProps, WidgetControlProps } from '../../interface';

const StyledNowButton = styled('div')`
  width: fit-content;
`;

interface NowButtonProps {
  handleChange: (value: Date) => void;
  disabled: boolean;
}

function NowButton({ t, handleChange, disabled }: TranslatedProps<NowButtonProps>) {
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
}

const DateTimeControl = ({
  field,
  label,
  value,
  t,
  isDisabled,
  onChange,
  hasErrors,
}: WidgetControlProps<string, DateTimeField>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

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

  const dateValue = useMemo(
    () => (format ? parse(internalValue, format, new Date()) : parseISO(internalValue)),
    [format, internalValue],
  );

  const timezoneOffset = useMemo(() => dateValue.getTimezoneOffset() * 60000, [dateValue]);

  const utcDate = useMemo(() => {
    const dateTime = new Date(dateValue);
    const utcFromLocal = new Date(dateTime.getTime() + timezoneOffset);
    return utcFromLocal;
  }, [dateValue, timezoneOffset]);

  const localToUTC = useCallback(
    (dateTime: Date) => {
      const utcFromLocal = new Date(dateTime.getTime() - timezoneOffset);
      return utcFromLocal;
    },
    [timezoneOffset],
  );

  const defaultValue = useMemo(() => {
    const today = field.picker_utc ? localToUTC(new Date()) : new Date();
    return field.default === undefined
      ? format
        ? formatDate(today, format)
        : formatISO(today)
      : field.default;
  }, [field.default, field.picker_utc, format, localToUTC]);

  const handleChange = useCallback(
    (datetime: Date | null) => {
      if (datetime === null) {
        setInternalValue(defaultValue);
        onChange(defaultValue);
        return;
      }

      const adjustedValue = field.picker_utc ? localToUTC(datetime) : datetime;

      let formattedValue: string;
      if (format) {
        formattedValue = formatDate(adjustedValue, format);
      } else {
        formattedValue = formatISO(adjustedValue);
      }
      setInternalValue(formattedValue);
      onChange(formattedValue);
    },
    [defaultValue, field.picker_utc, format, localToUTC, onChange],
  );

  useEffect(() => {
    /**
     * Set the current date as default value if no value is provided and default is absent. An
     * empty default string means the value is intentionally blank.
     */
    if (internalValue === undefined) {
      setTimeout(() => {
        setInternalValue(defaultValue);
        onChange(defaultValue);
      }, 0);
    }
  }, [defaultValue, handleChange, internalValue, onChange]);

  const dateTimePicker = useMemo(() => {
    if (dateFormat && !timeFormat) {
      return (
        <MobileDatePicker
          key="mobile-date-picker"
          inputFormat={typeof dateFormat === 'string' ? dateFormat : 'MMM d, yyyy'}
          label={label}
          value={field.picker_utc ? utcDate : dateValue}
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
          inputFormat={typeof timeFormat === 'string' ? timeFormat : 'H:mm'}
          value={field.picker_utc ? utcDate : dateValue}
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

    let inputFormat = 'MMM d, yyyy H:mm';
    if (dateFormat || timeFormat) {
      const formatParts: string[] = [];
      if (typeof dateFormat === 'string') {
        formatParts.push(dateFormat);
      }

      if (typeof timeFormat === 'string') {
        formatParts.push(timeFormat);
      }

      inputFormat = formatParts.join(' ');
    }

    return (
      <MobileDateTimePicker
        key="mobile-date-time-picker"
        inputFormat={inputFormat}
        label={label}
        value={field.picker_utc ? utcDate : dateValue}
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
