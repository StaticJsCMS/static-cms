import ObjectPreview from '../object/ObjectPreview';
import controlComponent from './ListControl';
import schema from './schema';

import type { FieldList, WidgetParam, ObjectValue } from '../../interface';

const ListWidget = (): WidgetParam<ObjectValue[], FieldList> => {
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
