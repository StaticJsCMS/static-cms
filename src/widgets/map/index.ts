import previewComponent from './MapPreview';
import schema from './schema';
import withMapControl from './withMapControl';

import type { CmsFieldMap, CmsWidgetParam } from '../../interface';

const controlComponent = withMapControl();

const MapWidget = (): CmsWidgetParam<string, CmsFieldMap> => {
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
