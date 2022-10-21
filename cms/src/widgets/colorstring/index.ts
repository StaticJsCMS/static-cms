import controlComponent from './ColorControl';
import previewComponent from './ColorPreview';

import type { ColorField, WidgetParam } from '../../interface';

const ColorWidget = (): WidgetParam<string, ColorField> => {
  return {
    name: 'color',
    controlComponent,
    previewComponent,
  };
};

export default ColorWidget;
