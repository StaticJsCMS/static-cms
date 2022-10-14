import controlComponent from './DateTimeControl';
import previewComponent from './DateTimePreview';
import schema from './schema';

import type { FieldDateTime, WidgetParam } from '../../interface';

const DateTimeWidget = (): WidgetParam<string, FieldDateTime> => {
  return {
    name: 'datetime',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export default DateTimeWidget;
