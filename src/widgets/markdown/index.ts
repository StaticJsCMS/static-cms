import controlComponent from './MarkdownControl/MarkdownControl';
import previewComponent from './MarkdownPreview';
import schema from './schema';

import type { CmsFieldMarkdown, CmsWidgetParam } from '../../interface';

function Widget(): CmsWidgetParam<string, CmsFieldMarkdown> {
  return {
    name: 'markdown',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
}

export const StaticCmsWidgetMarkdown = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetMarkdown;
