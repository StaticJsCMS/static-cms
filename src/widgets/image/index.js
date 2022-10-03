import StaticCmsWidgetFile from '../file';
import previewComponent from './ImagePreview';
import schema from './schema';

const controlComponent = StaticCmsWidgetFile.withFileControl({ forImage: true });

function Widget(opts = {}) {
  return {
    name: 'image',
    controlComponent,
    previewComponent,
    schema,
    ...opts,
  };
}

export const StaticCmsWidgetImage = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetImage;
