import controlComponent from './ColorControl';
import previewComponent from './ColorPreview';

import type { ColorField, WidgetParam } from '@staticcms/core/interface';

const ColorWidget = (): WidgetParam<string, ColorField> => {
  return {
    name: 'color',
    controlComponent,
    previewComponent,
  };
};

export { controlComponent as ColorControl, previewComponent as ColorPreview };

export default ColorWidget;
