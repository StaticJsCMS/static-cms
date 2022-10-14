import withFileControl, { getValidValue } from '../file/withFileControl';
import previewComponent from './ImagePreview';
import schema from './schema';

import type { FieldFileOrImage, WidgetParam } from '../../interface';

const controlComponent = withFileControl({ forImage: true });

function ImageWidget(): WidgetParam<string | string[], FieldFileOrImage> {
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

export default ImageWidget;
