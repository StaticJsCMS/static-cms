import controlComponent from './CodeControl';
import previewComponent from './CodePreview';
import schema from './schema';

import type { CmsFieldCode, CmsWidgetParam } from '../../interface';

const CodeWidget = (): CmsWidgetParam<string | { [key: string]: string }, CmsFieldCode> => {
  return {
    name: 'code',
    controlComponent,
    previewComponent,
    options: {
      schema,
      allowMapValue: true,
    },
  };
};

export default CodeWidget;
