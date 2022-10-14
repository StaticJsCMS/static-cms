import controlComponent from './ObjectControl';
import previewComponent from './ObjectPreview';
import schema from './schema';

import type { FieldList, FieldObject, WidgetParam, ObjectValue } from '../../interface';

const ObjectWidget = (): WidgetParam<ObjectValue, FieldObject | FieldList> => {
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
