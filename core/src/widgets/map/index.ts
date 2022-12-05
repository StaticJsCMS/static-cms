import previewComponent from './MapPreview';
import schema from './schema';
import withMapControl from './withMapControl';

import type { MapField, WidgetParam } from '@staticcms/core/interface';

const controlComponent = withMapControl();

const MapWidget = (): WidgetParam<string, MapField> => {
  return {
    name: 'map',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export { previewComponent as MapPreview, schema as MapSchema, withMapControl };

export default MapWidget;
