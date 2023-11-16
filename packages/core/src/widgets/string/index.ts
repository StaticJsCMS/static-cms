import schema from './schema';
import controlComponent from './StringControl';
import previewComponent from './StringPreview';

import type { StringField, WidgetParam } from '@staticcms/core';

const StringWidget = (): WidgetParam<string, StringField> => {
  return {
    name: 'string',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export {
  controlComponent as StringControl,
  previewComponent as StringPreview,
  schema as stringSchema,
};

export default StringWidget;
