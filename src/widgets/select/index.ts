import controlComponent from './SelectControl';
import previewComponent from './SelectPreview';
import schema from './schema';
import { validateMinMax } from '../../lib/widgets/validations';

import type { CmsFieldSelect, CmsWidgetParam } from '../../interface';

const SelectWidget = (): CmsWidgetParam<string | string[], CmsFieldSelect> => {
  return {
    name: 'select',
    controlComponent,
    previewComponent,
    options: {
      validator: ({ field, value, t }) => {
        const min = field.min;
        const max = field.max;

        if (!field.multiple || typeof value === 'string') {
          return { error: false };
        }

        const error = validateMinMax(t, field.label ?? field.name, value, min, max);

        return error ? { error } : { error: false };
      },
      schema,
    },
  };
};

export default SelectWidget;
