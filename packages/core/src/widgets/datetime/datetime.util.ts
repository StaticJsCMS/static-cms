import { useMemo } from 'react';

import {
  DEFAULT_DATETIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIMEZONE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from './constants';

import type { DateTimeField } from '@staticcms/core/interface';

export function getTimezoneExtra(field: DateTimeField) {
  return field.picker_utc ? '' : DEFAULT_TIMEZONE_FORMAT;
}

export function useTimezoneExtra(field: DateTimeField) {
  return useMemo(() => getTimezoneExtra(field), [field]);
}

export function getDatetimeFormats(field: DateTimeField, timezoneExtra: string) {
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
}

export function useDatetimeFormats(field: DateTimeField, timezoneExtra: string) {
  return useMemo(() => getDatetimeFormats(field, timezoneExtra), [field, timezoneExtra]);
}
