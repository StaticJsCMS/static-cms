import controlComponent from './MarkdownControl';
import previewComponent from './MarkdownPreview';
import schema from './schema';

import type { MarkdownField, WidgetParam } from '@staticcms/core/interface';

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

export * from './plate';
export {
  controlComponent as MarkdownControl,
  previewComponent as MarkdownPreview,
  schema as MarkdownSchema,
};

export default MarkdownWidget;
