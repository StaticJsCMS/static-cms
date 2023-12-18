import schema from './schema';
import controlComponent from './StringControl';
import previewComponent from './StringPreview';
import type { StringOrTextField, WidgetParam } from '@staticcms/core/interface';
declare const StringWidget: () => WidgetParam<string, StringOrTextField>;
export { controlComponent as StringControl, previewComponent as StringPreview, schema as stringSchema, };
export default StringWidget;
