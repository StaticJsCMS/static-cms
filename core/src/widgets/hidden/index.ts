import controlComponent from './HiddenControl';
import previewComponent from './HiddenPreview';

import type { HiddenField, WidgetParam } from '@staticcms/core/interface';

const StringWidget = (): WidgetParam<string, HiddenField> => {
  return {
    name: 'hidden',
    controlComponent,
    previewComponent,
  };
};

export { controlComponent as HiddenControl, previewComponent as HiddenPreview };

export default StringWidget;
