import StaticCmsWidgetFile, { getValidValue } from '../file';
import previewComponent from './ImagePreview';
import schema from './schema';

const controlComponent = StaticCmsWidgetFile.withFileControl({ forImage: true });

function Widget() {
  return {
    name: 'image',
    controlComponent,
    previewComponent,
    options: {
      schema,
      getValidValue,
    },
  };
}

export const StaticCmsWidgetImage = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetImage;
