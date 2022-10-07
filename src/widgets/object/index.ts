import controlComponent from './ObjectControl';
import previewComponent from './ObjectPreview';
import schema from './schema';

import type {
  CmsFieldList,
  CmsFieldObject,
  CmsWidgetParam,
  ValueOrNestedValue,
} from '../../interface';

const ObjectWidget = (): CmsWidgetParam<
  {
    [key: string]: ValueOrNestedValue;
  },
  CmsFieldObject | CmsFieldList
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
