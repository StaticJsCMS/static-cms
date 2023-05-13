import controlComponent from './ColorControl';
import previewComponent from './ColorPreview';
import schema from './schema';
import validator from './validator';

import type { ColorField, WidgetParam } from '@staticcms/core/interface';

const ColorWidget = (): WidgetParam<string, ColorField> => {
  return {
    name: 'color',
    controlComponent,
    previewComponent,
    options: {
      schema,
      validator,
    },
  };
};

export {
  controlComponent as ColorControl,
  previewComponent as ColorPreview,
  schema as colorSchema,
  validator as colorValidator,
};

export default ColorWidget;
