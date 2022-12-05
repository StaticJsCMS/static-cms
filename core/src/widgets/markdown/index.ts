import controlComponent from './MarkdownControl';
import previewComponent from './MarkdownPreview';

import type { MarkdownField, WidgetParam } from '@staticcms/core/interface';

const MarkdownWidget = (): WidgetParam<string, MarkdownField> => {
  return {
    name: 'markdown',
    controlComponent,
    previewComponent,
  };
};

export * from './plate';
export { controlComponent as MarkdownControl, previewComponent as MarkdownPreview };

export default MarkdownWidget;
