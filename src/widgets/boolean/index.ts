import controlComponent from './BooleanControl';

import type { CmsFieldBoolean, CmsWidgetParam } from '../../interface';

const BooleanWidget = (): CmsWidgetParam<boolean, CmsFieldBoolean> => {
  return {
    name: 'boolean',
    controlComponent,
  };
};

export default BooleanWidget;
