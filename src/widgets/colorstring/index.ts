import controlComponent from './ColorControl';
import previewComponent from './ColorPreview';

import type { FieldColor, WidgetParam } from '../../interface';

const ColorWidget = (): WidgetParam<string, FieldColor> => {
  return {
    name: 'color',
    controlComponent,
    previewComponent,
  };
};

export default ColorWidget;
