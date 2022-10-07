import controlComponent from './DateTimeControl';
import previewComponent from './DateTimePreview';
import schema from './schema';

import type { CmsFieldDateTime, CmsWidgetParam } from '../../interface';

const DateTimeWidget = (): CmsWidgetParam<string, CmsFieldDateTime> => {
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
