import controlComponent from './ColorControl';
import previewComponent from './ColorPreview';
import schema from './schema';

import type { ColorField, WidgetParam } from '@staticcms/core/interface';

const ColorWidget = (): WidgetParam<string, ColorField> => {
  return {
    name: 'color',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export {
  controlComponent as ColorControl,
  previewComponent as ColorPreview,
  schema as ColorSchema,
};

export default ColorWidget;
