import ObjectPreview from '../object/ObjectPreview';
import controlComponent from './ListControl';
import schema from './schema';

import type { CmsFieldList, CmsWidgetParam, ListValue } from '../../interface';

const ListWidget = (): CmsWidgetParam<ListValue[], CmsFieldList> => {
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
