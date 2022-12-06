import formatDate from 'date-fns/format';

import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import controlComponent, { localToUTC } from './DateTimeControl';
import previewComponent from './DateTimePreview';
import schema from './schema';

import type { DateTimeField, WidgetParam } from '@staticcms/core/interface';

const DateTimeWidget = (): WidgetParam<string, DateTimeField> => {
  return {
    name: 'datetime',
    controlComponent,
    previewComponent,
    options: {
      schema,
      getDefaultValue: (defaultValue: string | null | undefined, field: DateTimeField) => {
        if (isNotNullish(defaultValue)) {
          return defaultValue;
        }

        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        const format = field.format;

        // dateFormat and timeFormat are strictly for modifying input field with the date/time pickers
        const dateFormat: string | boolean = field.date_format ?? true;
        // show time-picker? false hides it, true shows it using default format
        const timeFormat: string | boolean = field.time_format ?? true;

        let inputFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
        if (typeof dateFormat === 'string' || typeof timeFormat === 'string') {
          const formatParts: string[] = [];
          if (typeof dateFormat === 'string' && isNotEmpty(dateFormat)) {
            formatParts.push(dateFormat);
          }

          if (typeof timeFormat === 'string' && isNotEmpty(timeFormat)) {
            formatParts.push(timeFormat);
          }

          if (formatParts.length > 0) {
            inputFormat = formatParts.join(' ');
          }
        }

        const today = field.picker_utc ? localToUTC(new Date(), timezoneOffset) : new Date();
        return format ? formatDate(today, format) : formatDate(today, inputFormat);
      },
    },
  };
};

export {
  controlComponent as DateTimeControl,
  previewComponent as DateTimePreview,
  schema as DateTimeSchema,
};

export default DateTimeWidget;
