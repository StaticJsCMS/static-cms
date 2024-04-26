import * as Locales from 'date-fns/locale';
import { useMemo } from 'react';

import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import {
  DEFAULT_DATETIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIMEZONE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from './constants';

import type { DateTimeField, DateTimeFormats } from '@staticcms/core';
import type { Locale } from 'date-fns/locale';

function getDisplayFormat(
  dateFormat: string | boolean,
  timeFormat: string | boolean,
  storageFormat: string,
) {
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
      formatParts.push(`${DEFAULT_TIME_FORMAT}`);
    }

    if (formatParts.length > 0) {
      return formatParts.join(' ');
    }
  }

  if (timeFormat === false) {
    return storageFormat ?? DEFAULT_DATE_FORMAT;
  }

  if (dateFormat === false) {
    return storageFormat ?? `${DEFAULT_TIME_FORMAT}`;
  }

  return storageFormat ?? `${DEFAULT_DATETIME_FORMAT}`;
}

export function getDatetimeFormats(field: DateTimeField): DateTimeFormats;
export function getDatetimeFormats(field: DateTimeField | undefined): DateTimeFormats | undefined;
export function getDatetimeFormats(field: DateTimeField | undefined) {
  if (!field) {
    return undefined;
  }

  const timezoneExtra = field.picker_utc ? '' : DEFAULT_TIMEZONE_FORMAT;

  // dateFormat and timeFormat are strictly for modifying input field with the date/time pickers
  const dateFormat: string | boolean = field.date_format ?? true;
  // show time-picker? false hides it, true shows it using default format
  const timeFormat: string | boolean = field.time_format ?? true;

  let storageFormat = field.format;
  let shouldAddTimezoneExtra = false;
  if (timeFormat === false) {
    storageFormat = field.format ?? DEFAULT_DATE_FORMAT;
  } else if (dateFormat === false) {
    storageFormat = field.format ?? DEFAULT_TIME_FORMAT;
    shouldAddTimezoneExtra = !field.format;
  } else {
    storageFormat = field.format ?? DEFAULT_DATETIME_FORMAT;
    shouldAddTimezoneExtra = !field.format;
  }

  const displayFormat = getDisplayFormat(dateFormat, timeFormat, storageFormat);

  return {
    storageFormat: `${storageFormat}${shouldAddTimezoneExtra ? timezoneExtra : ''}`,
    dateFormat,
    timeFormat,
    displayFormat,
    timezoneExtra,
  };
}

export function useDatetimeFormats(field: DateTimeField): DateTimeFormats;
export function useDatetimeFormats(field: DateTimeField | undefined): DateTimeFormats | undefined;
export function useDatetimeFormats(field: DateTimeField | undefined): DateTimeFormats | undefined {
  return useMemo(() => getDatetimeFormats(field), [field]);
}

export function getDateFnsLocale(locale: string): Locale {
  return (Locales as Record<string, Locale>)[locale] ?? Locales.enUS;
}
