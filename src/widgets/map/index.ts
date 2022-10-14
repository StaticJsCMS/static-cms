import previewComponent from './MapPreview';
import schema from './schema';
import withMapControl from './withMapControl';

import type { FieldMap, WidgetParam } from '../../interface';

const controlComponent = withMapControl();

const MapWidget = (): WidgetParam<string, FieldMap> => {
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
