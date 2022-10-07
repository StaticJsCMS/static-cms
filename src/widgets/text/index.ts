import controlComponent from './TextControl';
import previewComponent from './TextPreview';

import type { CmsFieldStringOrText, CmsWidgetParam } from '../../interface';

const TextWidget = (): CmsWidgetParam<string, CmsFieldStringOrText> => {
  return {
    name: 'text',
    controlComponent,
    previewComponent,
  };
};

export default TextWidget;
