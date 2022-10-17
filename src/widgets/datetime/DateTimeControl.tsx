import { styled } from '@mui/material/styles';
import TodayIcon from '@mui/icons-material/Today';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import formatDate from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import type { MouseEvent } from 'react';
import type { DateTimeField, WidgetControlProps, TranslatedProps } from '../../interface';

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
  path,
  field,
  label,
  value,
  t,
  isDisabled,
  onChange,
}: WidgetControlProps<string, DateTimeField>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  const { format, dateFormat, timeFormat } = useMemo(() => {
    const format = field.format;

    // dateFormat and timeFormat are strictly for modifying input field with the date/time pickers
    const dateFormat: string | boolean = field.date_format ?? false;
    // show time-picker? false hides it, true shows it using default format
    let timeFormat: string | boolean = field.time_format ?? false;
    if (typeof timeFormat === 'undefined') {
      timeFormat = true;
    }

    return {
      format,
      dateFormat,
      timeFormat,
    };
  }, [field.date_format, field.format, field.time_format]);

  const defaultValue = useMemo(() => {
    const defaultValue = field.default;
    return defaultValue;
  }, [field.default]);

  const handleChange = useCallback(
    (datetime: string | Date | null) => {
      if (datetime === null) {
        onChange(path, field, datetime);
        return;
      }

      if (typeof datetime === 'string') {
        return datetime;
      }

      /**
       * Produce a formatted string only if a format is set in the config.
       * Otherwise produce a date object.
       */
      let newValue: string;
      if (format) {
        newValue = formatDate(datetime, format);
      } else {
        newValue = formatISO(datetime);
      }

      setInternalValue(newValue);
      onChange(path, field, newValue);
    },
    [field, format, onChange, path],
  );

  useEffect(() => {
    /**
     * Set the current date as default value if no value is provided and default is absent. An
     * empty default string means the value is intentionally blank.
     */
    if (internalValue === undefined) {
      setTimeout(() => {
        handleChange(defaultValue === undefined ? new Date() : defaultValue);
      }, 0);
    }
  }, [defaultValue, handleChange, internalValue]);

  const dateTimePicker = useMemo(() => {
    if (dateFormat && !timeFormat) {
      return (
        <MobileDatePicker
          key="mobile-date-picker"
          inputFormat={typeof dateFormat === 'string' ? dateFormat : 'MMM d, yyyy'}
          label={label}
          value={internalValue}
          onChange={handleChange}
          renderInput={params => (
            <TextField
              key="mobile-date-input"
              {...params}
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
          value={internalValue}
          onChange={handleChange}
          renderInput={params => (
            <TextField
              key="time-input"
              {...params}
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
        value={internalValue}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            key="mobile-date-time-input"
            {...params}
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
  }, [dateFormat, handleChange, internalValue, isDisabled, label, t, timeFormat]);

  return (
    <LocalizationProvider key="localization-provider" dateAdapter={AdapterDateFns}>
      {dateTimePicker}
    </LocalizationProvider>
  );
};

export default DateTimeControl;
