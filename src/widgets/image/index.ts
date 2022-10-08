import withFileControl, { getValidValue } from '../file/withFileControl';
import previewComponent from './ImagePreview';
import schema from './schema';

import type { CmsFieldFileOrImage, CmsWidgetParam } from '../../interface';

const controlComponent = withFileControl({ forImage: true });

function ImageWidget(): CmsWidgetParam<string | string[], CmsFieldFileOrImage> {
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
