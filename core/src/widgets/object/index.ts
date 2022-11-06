import controlComponent from './ObjectControl';
import previewComponent from './ObjectPreview';
import schema from './schema';

import type { ObjectField, ObjectValue, WidgetParam } from '../../interface';

const ObjectWidget = (): WidgetParam<ObjectValue, ObjectField> => {
  return {
    name: 'object',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export default ObjectWidget;
