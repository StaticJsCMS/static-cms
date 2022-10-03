import controlComponent from './StringControl';
import previewComponent from './StringPreview';

import type { CmsWidgetParam } from '../../interface';

function Widget(opts = {}): CmsWidgetParam<string> {
  return {
    name: 'string',
    controlComponent,
    previewComponent,
    ...opts,
  };
}

export const StaticCmsWidgetString = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetString;
