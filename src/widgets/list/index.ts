import ObjectPreview from '../object/ObjectPreview';
import controlComponent from './ListControl';
import schema from './schema';

import type { FieldList, WidgetParam, ListValue } from '../../interface';

const ListWidget = (): WidgetParam<ListValue[], FieldList> => {
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
