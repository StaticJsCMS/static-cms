import ObjectPreview from '../object/ObjectPreview';
import controlComponent from './ListControl';
import schema from './schema';

import type { ListField, WidgetParam, ObjectValue } from '../../interface';

const ListWidget = (): WidgetParam<ObjectValue[], ListField> => {
  return {
    name: 'list',
    controlComponent,
    previewComponent: ObjectPreview,
    options: {
      schema,
    },
  };
};

export default ListWidget;
