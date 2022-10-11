import controlComponent from './MarkdownControl/MarkdownControl';
import previewComponent from './MarkdownPreview';
import schema from './schema';

import type { CmsFieldMarkdown, CmsWidgetParam } from '../../interface';

const MarkdownWidget = (): CmsWidgetParam<string, CmsFieldMarkdown> => {
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
