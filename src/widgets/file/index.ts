import withFileControl, { getValidValue } from './withFileControl';
import previewComponent from './FilePreview';
import schema from './schema';

import type { CmsFieldFileOrImage, CmsWidgetParam } from '../../interface';

const controlComponent = withFileControl();

const FileWidget = (): CmsWidgetParam<string | string[], CmsFieldFileOrImage> => {
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
