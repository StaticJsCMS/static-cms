import controlComponent from './TextControl';
import previewComponent from './TextPreview';

import type { StringOrTextField, WidgetParam } from '../../interface';

const TextWidget = (): WidgetParam<string, StringOrTextField> => {
  return {
    name: 'text',
    controlComponent,
    previewComponent,
  };
};

export default TextWidget;
