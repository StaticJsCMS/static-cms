import withFileControl, { getValidFileValue } from '../file/withFileControl';
import previewComponent from './ImagePreview';
import schema from './schema';

import type { FileOrImageField, WidgetParam } from '@staticcms/core/interface';

const controlComponent = withFileControl({ forImage: true });

function ImageWidget(): WidgetParam<string | string[], FileOrImageField> {
  return {
    name: 'image',
    controlComponent,
    previewComponent,
    options: {
      schema,
      getValidValue: getValidFileValue,
    },
  };
}

export { previewComponent as ImagePreview, schema as ImageSchema };

export default ImageWidget;
