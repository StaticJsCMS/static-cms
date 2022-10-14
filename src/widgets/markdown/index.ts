import controlComponent from './MarkdownControl';
import previewComponent from './MarkdownPreview';
import schema from './schema';

import type { FieldMarkdown, WidgetParam } from '../../interface';

const MarkdownWidget = (): WidgetParam<string, FieldMarkdown> => {
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
