import controlComponent from './StringControl';
import previewComponent from './StringPreview';

import type { CmsFieldStringOrText, CmsWidgetParam } from '../../interface';

const StringWidget = (): CmsWidgetParam<string, CmsFieldStringOrText> => {
  return {
    name: 'string',
    controlComponent,
    previewComponent,
  };
};

export default StringWidget;
