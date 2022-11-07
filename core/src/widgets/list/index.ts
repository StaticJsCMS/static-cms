import controlComponent from './ListControl';
import previewComponent from './ListPreview';
import schema from './schema';

import type { ListField, WidgetParam, ObjectValue } from '../../interface';

const ListWidget = (): WidgetParam<ObjectValue[], ListField> => {
  return {
    name: 'list',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export default ListWidget;
