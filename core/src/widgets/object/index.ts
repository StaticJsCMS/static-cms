import controlComponent from './ObjectControl';
import previewComponent from './ObjectPreview';
import schema from './schema';

import type { ObjectField, ObjectValue, WidgetParam } from '@staticcms/core/interface';

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

export {
  controlComponent as ObjectControl,
  previewComponent as ObjectPreview,
  schema as ObjectSchema,
};

export default ObjectWidget;
