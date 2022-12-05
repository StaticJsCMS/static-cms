import controlComponent from './StringControl';
import previewComponent from './StringPreview';

import type { StringOrTextField, WidgetParam } from '@staticcms/core/interface';

const StringWidget = (): WidgetParam<string, StringOrTextField> => {
  return {
    name: 'string',
    controlComponent,
    previewComponent,
  };
};

export { controlComponent as StringControl, previewComponent as StringPreview };

export default StringWidget;
