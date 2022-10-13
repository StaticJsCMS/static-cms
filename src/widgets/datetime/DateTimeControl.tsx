import styled from '@emotion/styled';
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

import type { CmsFieldDateTime, CmsWidgetControlProps, TranslatedProps } from '../../interface';

const StyledNowButton = styled.div`
  position: absolute;
  right: 20px;
  transform: translateY(-40px);
  width: fit-content;
  z-index: 1;
`;

interface NowButtonProps {
  handleChange: (value: Date) => void;
}

function NowButton({ t, handleChange }: TranslatedProps<NowButtonProps>) {
  return (
    <StyledNowButton>
      <Button
        onClick={() => {
          handleChange(new Date());
        }}
      >
        {t('editor.editorWidgets.datetime.now')}
      </Button>
    </StyledNowButton>
  );
}

const DateTimeControl = ({
  path,
  field,
  value,
  t,
  isDisabled,
  onChange,
}: CmsWidgetControlProps<string, CmsFieldDateTime>) => {
  const [internalValue, setInternalValue] = useState(value);

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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {timeFormat ? (
        dateFormat ? (
          <MobileDateTimePicker
            inputFormat={`${typeof dateFormat === 'string' ? dateFormat : undefined} ${
              typeof timeFormat === 'string' ? timeFormat : undefined
            }`}
            value={internalValue}
            onChange={handleChange}
            renderInput={params => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  '.MuiInputBase-root': {
                    borderTopLeftRadius: 0,
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#dfdfe3',
                    },
                    '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#dfdfe3',
                    },
                  },
                }}
              />
            )}
          />
        ) : (
          <TimePicker
            value={internalValue}
            onChange={handleChange}
            renderInput={params => <TextField {...params} fullWidth />}
          />
        )
      ) : (
        <MobileDatePicker
          inputFormat={typeof dateFormat === 'string' ? dateFormat : undefined}
          value={internalValue}
          onChange={handleChange}
          renderInput={params => <TextField {...params} fullWidth />}
        />
      )}
      {!isDisabled && <NowButton t={t} handleChange={v => handleChange(v)} />}
    </LocalizationProvider>
  );
};

export default DateTimeControl;
