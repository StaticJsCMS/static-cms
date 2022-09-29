import SimpleCmsWidgetFile from '../file';
import previewComponent from './ImagePreview';
import schema from './schema';

const controlComponent = SimpleCmsWidgetFile.withFileControl({ forImage: true });

function Widget(opts = {}) {
  return {
    name: 'image',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const SimpleCmsWidgetImage = { Widget, controlComponent, previewComponent };
export default SimpleCmsWidgetImage;
