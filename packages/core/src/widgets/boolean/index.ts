import controlComponent from './BooleanControl';
import schema from './schema';

import type { BooleanField, WidgetParam } from '@staticcms/core/interface';

const BooleanWidget = (): WidgetParam<boolean, BooleanField> => {
  return {
    name: 'boolean',
    controlComponent,
    options: {
      schema,
      getDefaultValue: (defaultValue: boolean | undefined | null) => {
        return typeof defaultValue === 'boolean' ? defaultValue : false;
      },
    },
  };
};

export { controlComponent as BooleanControl, schema as BooleanSchema };

export default BooleanWidget;
