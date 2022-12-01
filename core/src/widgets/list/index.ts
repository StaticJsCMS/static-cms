import controlComponent from './ListControl';
import previewComponent from './ListPreview';
import schema from './schema';

import type { ListField, ObjectValue, WidgetParam } from '@staticcms/core/interface';

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

export { default as ListItem } from './ListItem';
export * from './typedListHelpers';
export { controlComponent as ListControl, previewComponent as ListPreview, schema as ListSchema };

export default ListWidget;
