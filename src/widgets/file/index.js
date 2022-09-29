import withFileControl from './withFileControl';
import previewComponent from './FilePreview';
import schema from './schema';

const controlComponent = withFileControl();

function Widget(opts = {}) {
  return {
    name: 'file',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const SimpleCmsWidgetFile = { Widget, controlComponent, previewComponent, withFileControl };
export default SimpleCmsWidgetFile;
