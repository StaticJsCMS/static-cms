import controlComponent from './DateTimeControl';
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
    },
  };
};

export {
  controlComponent as DateTimeControl,
  previewComponent as DateTimePreview,
  schema as DateTimeSchema,
};

export default DateTimeWidget;
