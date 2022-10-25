import withFileControl, { getValidValue } from './withFileControl';
import previewComponent from './FilePreview';
import schema from './schema';

import type { FileOrImageField, WidgetParam } from '../../interface';

const controlComponent = withFileControl();

const FileWidget = (): WidgetParam<string | string[], FileOrImageField> => {
  return {
    name: 'file',
    controlComponent,
    previewComponent,
    options: {
      schema,
      getValidValue,
    },
  };
};

export default FileWidget;
