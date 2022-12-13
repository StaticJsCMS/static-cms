import schema from './schema';
import controlComponent from './TextControl';
import previewComponent from './TextPreview';

import type { StringOrTextField, WidgetParam } from '@staticcms/core/interface';

const TextWidget = (): WidgetParam<string, StringOrTextField> => {
  return {
    name: 'text',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export { controlComponent as TextControl, previewComponent as TextPreview, schema as TextSchema };

export default TextWidget;
