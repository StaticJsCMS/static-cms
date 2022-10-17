import controlComponent from './CodeControl';
import previewComponent from './CodePreview';
import schema from './schema';

import type { CodeField, WidgetParam } from '../../interface';

const CodeWidget = (): WidgetParam<string | { [key: string]: string }, CodeField> => {
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
