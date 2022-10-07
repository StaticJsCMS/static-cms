import controlComponent from './ColorControl';
import previewComponent from './ColorPreview';

import type { CmsFieldColor, CmsWidgetParam } from '../../interface';

const ColorWidget = (): CmsWidgetParam<string, CmsFieldColor> => {
  return {
    name: 'color',
    controlComponent,
    previewComponent,
  };
};

export default ColorWidget;
