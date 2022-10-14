import controlComponent from './RelationControl';
import previewComponent from './RelationPreview';
import schema from './schema';
import { validations } from '../../lib/widgets';

import type { FieldRelation, WidgetParam } from '../../interface';

function isMultiple(field: FieldRelation) {
  return field.multiple ?? false;
}

function RelationWidget(): WidgetParam<string | string[], FieldRelation> {
  return {
    name: 'relation',
    controlComponent,
    previewComponent,
    options: {
      validator: ({ field, value, t }) => {
        const min = field.min;
        const max = field.max;

        if (!isMultiple(field)) {
          return { error: false };
        }

        const error = validations.validateMinMax(t, field.label ?? field.name, value, min, max);

        return error ? { error } : { error: false };
      },
      schema,
    },
  };
}

export default RelationWidget;
