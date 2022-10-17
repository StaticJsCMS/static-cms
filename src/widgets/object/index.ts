import controlComponent from './ObjectControl';
import previewComponent from './ObjectPreview';
import schema from './schema';

import type { ListField, ObjectField, WidgetParam, ObjectValue } from '../../interface';

const ObjectWidget = (): WidgetParam<ObjectValue, ObjectField | ListField> => {
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
