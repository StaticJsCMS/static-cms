import controlComponent from './StringControl';
import previewComponent from './StringPreview';

import type { StringOrTextField, WidgetParam } from '../../interface';

const StringWidget = (): WidgetParam<string, StringOrTextField> => {
  return {
    name: 'string',
    controlComponent,
    previewComponent,
  };
};

export default StringWidget;
