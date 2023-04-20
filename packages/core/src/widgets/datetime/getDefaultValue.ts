import formatDate from 'date-fns/format';

import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { DEFAULT_DATETIME_FORMAT, DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from './constants';
import { localToUTC } from './utc.util';

import type { DateTimeField, FieldGetDefaultMethod } from '@staticcms/core/interface';

const getDefaultValue: FieldGetDefaultMethod<string | Date, DateTimeField> = (
  defaultValue,
  field,
) => {
  if (isNotNullish(defaultValue)) {
    return defaultValue;
  }

  // dateFormat and timeFormat are strictly for modifying input field with the date/time pickers
  const dateFormat: string | boolean = field.date_format ?? true;
  // show time-picker? false hides it, true shows it using default format
  const timeFormat: string | boolean = field.time_format ?? true;

  let finalFormat = field.format;
  if (timeFormat === false) {
    finalFormat = field.format ?? DEFAULT_DATE_FORMAT;
  } else if (dateFormat === false) {
    finalFormat = field.format ?? DEFAULT_TIME_FORMAT;
  } else {
    finalFormat = field.format ?? DEFAULT_DATETIME_FORMAT;
  }

  const today = field.picker_utc ? localToUTC(new Date()) : new Date();
  return formatDate(today, finalFormat);
};

export default getDefaultValue;
