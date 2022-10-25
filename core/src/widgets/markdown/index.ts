import controlComponent from './MarkdownControl';
import previewComponent from './MarkdownPreview';
import schema from './schema';

import type { MarkdownField, WidgetParam } from '../../interface';

const MarkdownWidget = (): WidgetParam<string, MarkdownField> => {
  return {
    name: 'markdown',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export default MarkdownWidget;
