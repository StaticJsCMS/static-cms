import controlComponent from './BooleanControl';

import type { BooleanField, WidgetParam } from '../../interface';

const BooleanWidget = (): WidgetParam<boolean, BooleanField> => {
  return {
    name: 'boolean',
    controlComponent,
  };
};

export default BooleanWidget;
