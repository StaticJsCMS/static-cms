import controlComponent from './TextControl';
import previewComponent from './TextPreview';

import type { CmsWidgetParam } from '../../interface';

function Widget(opts = {}): CmsWidgetParam<string> {
  return {
    name: 'text',
    controlComponent,
    previewComponent,
    ...opts,
  };
}

export const NetlifyCmsWidgetText = { Widget, controlComponent, previewComponent };
export default NetlifyCmsWidgetText;
