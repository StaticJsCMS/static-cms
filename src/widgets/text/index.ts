import controlComponent from './TextControl';
import previewComponent from './TextPreview';

import type { FieldStringOrText, WidgetParam } from '../../interface';

const TextWidget = (): WidgetParam<string, FieldStringOrText> => {
  return {
    name: 'text',
    controlComponent,
    previewComponent,
  };
};

export default TextWidget;
