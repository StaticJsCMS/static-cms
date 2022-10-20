import previewComponent from './MapPreview';
import schema from './schema';
import withMapControl from './withMapControl';

import type { MapField, WidgetParam } from '../../interface';

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

export default MapWidget;
