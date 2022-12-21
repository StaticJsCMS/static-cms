import controlComponent from './RelationControl';
import previewComponent from './RelationPreview';
import schema from './schema';
import { validations } from '@staticcms/core/lib/widgets';

import type { RelationField, WidgetParam } from '@staticcms/core/interface';

function isMultiple(field: RelationField) {
  return field.multiple ?? false;
}

function RelationWidget(): WidgetParam<string | string[], RelationField> {
  return {
    name: 'relation',
    controlComponent,
    previewComponent,
    options: {
      validator: ({ field, value, t }) => {
        const min = field.min;
        const max = field.max;

        if (!isMultiple(field)) {
          return false;
        }

        const error = validations.validateMinMax(t, field.label ?? field.name, value, min, max);

        return error ? error : false;
      },
      schema,
    },
  };
}

export {
  controlComponent as RelationControl,
  previewComponent as RelationPreview,
  schema as RelationSchema,
};

export default RelationWidget;
