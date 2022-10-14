import controlComponent from './ObjectControl';
import previewComponent from './ObjectPreview';
import schema from './schema';

import type { FieldList, FieldObject, WidgetParam, ValueOrNestedValue } from '../../interface';

const ObjectWidget = (): WidgetParam<
  {
    [key: string]: ValueOrNestedValue;
  },
  FieldObject | FieldList
> => {
  return {
    name: 'object',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export default ObjectWidget;
