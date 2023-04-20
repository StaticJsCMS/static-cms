import schema from './schema';
import controlComponent from './UUIDControl';
import previewComponent from './UUIDPreview';

import type { UUIDField, WidgetParam } from '@staticcms/core/interface';

const UUIDWidget = (): WidgetParam<string, UUIDField> => {
  return {
    name: 'uuid',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export { controlComponent as UUIDControl, previewComponent as UUIDPreview, schema as uuidSchema };

export default UUIDWidget;
