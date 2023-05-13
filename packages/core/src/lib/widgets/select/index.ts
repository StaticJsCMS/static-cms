import schema from './schema';
import controlComponent from './SelectControl';
import previewComponent from './SelectPreview';
import validator from './validator';

import type { SelectField, WidgetParam } from '@staticcms/core/interface';

const SelectWidget = (): WidgetParam<string | number | (string | number)[], SelectField> => {
  return {
    name: 'select',
    controlComponent,
    previewComponent,
    options: {
      validator,
      schema,
    },
  };
};

export {
  controlComponent as SelectControl,
  previewComponent as SelectPreview,
  schema as selectSchema,
  validator as selectValidator,
};

export default SelectWidget;
