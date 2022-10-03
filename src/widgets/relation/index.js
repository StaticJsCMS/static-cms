import controlComponent from './RelationControl';
import previewComponent from './RelationPreview';
import schema from './schema';
import { validations } from '../../lib/widgets';

function isMultiple(field) {
  return field.get('multiple', false);
}

function Widget(opts = {}) {
  return {
    name: 'relation',
    controlComponent,
    previewComponent,
    validator: ({ field, value, t }) => {
      const min = field.get('min');
      const max = field.get('max');

      if (!isMultiple(field)) {
        return { error: false };
      }

      const error = validations.validateMinMax(
        t,
        field.get('label', field.get('name')),
        value,
        min,
        max,
      );

      return error ? { error } : { error: false };
    },
    schema,
    ...opts,
  };
}

export const StaticCmsWidgetRelation = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetRelation;
