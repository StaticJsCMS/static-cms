import schema from './schema';
import controlComponent from './StringControl';
import previewComponent from './StringPreview';

import type { StringOrTextField, WidgetParam } from '@staticcms/core/interface';

const StringWidget = (): WidgetParam<string, StringOrTextField> => {
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
  schema as StringSchema,
};

export default StringWidget;
