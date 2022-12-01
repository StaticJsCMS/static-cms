import controlComponent from './BooleanControl';

import type { BooleanField, WidgetParam } from '@staticcms/core/interface';

const BooleanWidget = (): WidgetParam<boolean, BooleanField> => {
  return {
    name: 'boolean',
    controlComponent,
  };
};

export { controlComponent as BooleanControl };

export default BooleanWidget;
