import controlComponent from './StringControl';
import previewComponent from './StringPreview';

import type { FieldStringOrText, WidgetParam } from '../../interface';

const StringWidget = (): WidgetParam<string, FieldStringOrText> => {
  return {
    name: 'string',
    controlComponent,
    previewComponent,
  };
};

export default StringWidget;
