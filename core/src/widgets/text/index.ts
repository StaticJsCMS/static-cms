import controlComponent from './TextControl';
import previewComponent from './TextPreview';

import type { StringOrTextField, WidgetParam } from '@staticcms/core/interface';

const TextWidget = (): WidgetParam<string, StringOrTextField> => {
  return {
    name: 'text',
    controlComponent,
    previewComponent,
  };
};

export { controlComponent as TextControl, previewComponent as TextPreview };

export default TextWidget;
