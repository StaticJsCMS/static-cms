import previewComponent from './MapPreview';
import schema from './schema';
import withMapControl from './withMapControl';
import type { MapField, WidgetParam } from '@staticcms/core/interface';
declare const MapWidget: () => WidgetParam<string, MapField>;
export { previewComponent as MapPreview, schema as MapSchema, withMapControl };
export default MapWidget;
