import controlComponent from './MarkdownControl/MarkdownControl';
import previewComponent from './MarkdownPreview';
import schema from './schema';

function Widget(opts = {}) {
  return {
    name: 'markdown',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const StaticCmsWidgetMarkdown = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetMarkdown;
