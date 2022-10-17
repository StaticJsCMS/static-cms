import controlComponent from './DateTimeControl';
import previewComponent from './DateTimePreview';
import schema from './schema';

import type { DateTimeField, WidgetParam } from '../../interface';

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

export default DateTimeWidget;
