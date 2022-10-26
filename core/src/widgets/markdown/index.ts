import controlComponent from './MarkdownControl';
import previewComponent from './MarkdownPreview';

import type { MarkdownField, WidgetParam } from '../../interface';

const MarkdownWidget = (): WidgetParam<string, MarkdownField> => {
  return {
    name: 'markdown',
    controlComponent,
    previewComponent,
  };
};

export default MarkdownWidget;
