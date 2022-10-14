import controlComponent from './BooleanControl';

import type { FieldBoolean, WidgetParam } from '../../interface';

const BooleanWidget = (): WidgetParam<boolean, FieldBoolean> => {
  return {
    name: 'boolean',
    controlComponent,
  };
};

export default BooleanWidget;
