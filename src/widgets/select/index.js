import controlComponent from './SelectControl';
import previewComponent from './SelectPreview';
import schema from './schema';

function Widget(opts = {}) {
  return {
    name: 'select',
    controlComponent,
    previewComponent,
    validator: ({ field, value, t }) => {
      const min = field.min;
      const max = field.max;
  
      if (!field.multiple) {
        return { error: false };
      }
  
      const error = validations.validateMinMax(
        t,
        field.get('label', field.name),
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

export const StaticCmsWidgetSelect = { Widget, controlComponent, previewComponent };
export default StaticCmsWidgetSelect;
